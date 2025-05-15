import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useGetSkills from "../../hooks/app/useGetSkills";
import InputField from "../forms/InputField";
import MultiSelect from "../forms/MultiSelect";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";
import { useWorkForm } from "../../hooks/works/useWorkForm";

const AddWorkModal = ({
  showModal,
  setShowModal,
  targetWork,
  setTargetWork,
}) => {
  const { t } = useTranslation();
  const { data: skills } = useGetSkills();

  // Use the custom hook for form handling
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    selectedOptions,
    handleSelect,
    handleFileChange,
    handleDeleteImage,
    formValues,
    reset,
  } = useWorkForm(targetWork, setTargetWork, setShowModal);

  // Prepare skills options for the multi-select
  const skillOptions =
    skills?.map((skill) => ({
      value: skill.id,
      label: skill.name,
    })) || [];
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setTargetWork(null);
        reset({
          title: "",
          link: "",
          description: "",
          start_date: "",
          end_date: "",
          images: [],
          delete_images: [],
        });
      }}
      centered
      size="lg"
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>
          {targetWork?.id ? t("profile.editWork") : t("profile.addWork")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" form_ui container m-0 w-100"
        >
          {" "}
          <div className="row">
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
                      onChange={handleFileChange}
                    />
                    <img src="/images/gallery.svg" alt="upload" />
                    <div className="file_upload_dimensions">
                      9 <span>X</span> 16
                    </div>
                  </label>
                </div>
                {errors.images && (
                  <div className="invalid-feedback d-block">
                    {errors.images?.message}
                  </div>
                )}
                {formValues.images && formValues.images.length > 0 && (
                  <>
                    {formValues.images.map((image, index) => {
                      console.log(image);

                      return (
                        <div className="uploaded_file" key={index}>
                          <img
                            src={
                              image.image
                                ? image.image
                                : URL.createObjectURL(image)
                            }
                            alt="file"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index, image.id)}
                          >
                            <i className="fa-light fa-xmark"></i>
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            <div className="col-md-6 p-2">
              <InputField
                label={t("profile.projectTitle")}
                name="title"
                {...register("title")}
                error={errors.title?.message}
              />
            </div>
            <div className="col-md-6 p-2">
              <InputField
                label={t("profile.projectLink")}
                name="link"
                {...register("link")}
                error={errors.link?.message}
              />
            </div>
            <div className="col-md-6 p-2">
              <InputField
                label={t("profile.from")}
                name="start_date"
                type="date"
                {...register("start_date")}
                error={errors.start_date?.message}
              />
            </div>
            <div className="col-md-6 p-2">
              <InputField
                label={t("profile.to")}
                name="end_date"
                type="date"
                {...register("end_date")}
                error={errors.end_date?.message}
              />
            </div>
            <div className="col-12 p-2">
              <MultiSelect
                label={t("search.skills")}
                options={skillOptions}
                selectedOptions={selectedOptions}
                onChange={handleSelect}
                error={errors.skills?.message}
              />
            </div>
            <div className="col-12">
              <TextField
                label={t("profile.projectDescription")}
                name="description"
                {...register("description")}
                error={errors.description?.message}
              />
            </div>

            <div className="col-12 p-2">
              <SubmitButton
                name={
                  targetWork?.id ? t("profile.edit") : t("profile.addProject")
                }
                loading={isLoading}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkModal;
