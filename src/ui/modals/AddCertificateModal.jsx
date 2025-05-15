import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useCertificateForm } from "../../hooks/certificate/useCertificateForm";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";

const AddCertificateModal = ({
  showModal,
  setShowModal,
  targetCertificate,
  setTargetCertificate,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    imgRef,
    handleImageChange,
    handleCloseModal,
  } = useCertificateForm(targetCertificate, setShowModal, setTargetCertificate);

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>
          {targetCertificate?.id
            ? t("profile.editCertificate")
            : t("profile.addCertificate")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form
            className="form_ui container m-0 w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className=" col-12 p-2">
                <InputField
                  label={t("profile.certificateTitle")}
                  type="text"
                  name="title"
                  {...register("title")}
                  error={errors.title?.message}
                />
              </div>
              <div className="col-12 p-2">
                <div className="image_field">
                  <label htmlFor="certificate-image">
                    {t("profile.imageGallery")}
                  </label>
                  <label htmlFor="certificate-image" className="imagewrap">
                    <input
                      type="file"
                      id="certificate-image"
                      accept="image/*"
                      {...register("image", {
                        onChange: handleImageChange,
                      })}
                    />
                    <div className="img">
                      <img
                        src={"/images/gallery.svg"}
                        ref={imgRef}
                        alt="gallery"
                      />
                    </div>
                  </label>
                  {errors.image && (
                    <span className="error-message">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-12 p-2">
                <SubmitButton
                  name={
                    targetCertificate?.id ? t("profile.edit") : t("profile.add")
                  }
                  loading={isLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCertificateModal;
