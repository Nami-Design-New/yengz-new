import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import useGetSkills from "../../hooks/app/useGetSkills";
import { addWork, updateWork } from "../../services/apiWorks";
import { toast } from "sonner";
import InputField from "../forms/InputField";
import MultiSelect from "../forms/MultiSelect";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const AddWorkModal = ({
  showModal,
  setShowModal,
  targetWork,
  setTargetWork,
}) => {
  const { t } = useTranslation();
  const { data: skills } = useGetSkills();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    start_date: "",
    end_date: "",
    images: [],
    delete_images: [],
  });

  useEffect(() => {
    if (targetWork) {
      setFormData({
        id: targetWork.id,
        title: targetWork.title,
        link: targetWork.link,
        description: targetWork.description,
        start_date: targetWork.start_date,
        end_date: targetWork.end_date,
        images: targetWork.images || [],
        delete_images: [],
      });

      const options = targetWork?.skills?.map((item) => {
        const skill = skills?.find((s) => s?.id === item?.id);
        return { value: skill?.id, label: skill?.name };
      });

      setSelectedOptions(options);
    }
  }, [targetWork, skills]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSendForUpdate = {
      ...formData,
      images: formData.images.filter((image) =>
        image?.type?.startsWith("image/")
      ),
    };
    try {
      if (targetWork?.id) {
        await updateWork(dataToSendForUpdate, queryClient);
        toast.success(t("profile.workUpdatedSuccessfully"));
      } else {
        await addWork(formData, queryClient);
        toast.success(t("profile.workAddedSuccessfully"));
      }
      setShowModal(false);
      setFormData({
        title: "",
        link: "",
        description: "",
        start_date: "",
        end_date: "",
        images: [],
        delete_images: [],
      });
      setTargetWork(null);
    } catch (error) {
      console.error("Add work error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setFormData({
          title: "",
          link: "",
          description: "",
          start_date: "",
          end_date: "",
          images: [],
          delete_images: [],
        });
        setTargetWork(null);
      }}
      centered
      size="lg"
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("profile.addWork")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form_ui container m-0 w-100" onSubmit={handleSubmit}>
            <div className="row">
              {/* images */}
              <div className="col-12 p-2">
                <label htmlFor="certificate-image" className="mb-2">
                  {t("profile.images")}
                </label>
                <div className="images_grid_upload">
                  <div className="file_upload">
                    <label htmlFor="file_upload">
                      <input
                        type="file"
                        id="file_upload"
                        accept="image/*"
                        name="images"
                        multiple
                        onChange={handleImagesChange}
                      />
                      <img src={"/images/gallery.svg"} alt="upload" />
                      <div className="file_upload_dimensions">
                        9 <span>X</span> 16
                      </div>
                    </label>
                  </div>
                  {formData?.images && (
                    <>
                      {formData?.images?.map((image, index) => (
                        <div className="uploaded_file" key={index}>
                          <img
                            src={
                              image?.type?.startsWith("image/")
                                ? URL.createObjectURL(image)
                                : image?.image
                            }
                            alt="file"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveImage(index, image);
                            }}
                          >
                            <i className="fa-light fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              {/* title */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("profile.projectTitle")}
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
              {/* link */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("profile.projectLink")}
                  type="url"
                  name="link"
                  onChange={handleChange}
                  value={formData.link}
                />
              </div>
              {/* date */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("profile.from")}
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  value={formData.start_date}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("profile.to")}
                  type="date"
                  name="end_date"
                  onChange={handleChange}
                  value={formData.end_date}
                />
              </div>
              <div className="col-12 p-2">
                <MultiSelect
                  label={t("search.skills")}
                  id="skills"
                  name="skills"
                  selectedOptions={selectedOptions}
                  handleChange={handleSelect}
                  options={skills?.map((skill) => ({
                    label: skill?.name,
                    value: skill?.id,
                  }))}
                />
              </div>
              {/* description */}
              <div className="col-12 p-2">
                <TextField
                  label={t("profile.projectDescription")}
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
              <div className="col-12 p-2">
                <SubmitButton
                  name={
                    targetWork?.id ? t("profile.edit") : t("profile.addProject")
                  }
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkModal;
