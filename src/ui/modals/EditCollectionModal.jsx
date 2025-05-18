import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useUpdateCollection from "../../hooks/collections/useUpdateCollection";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";

const EditCollectionModal = ({ showModal, setShowModal, collection }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { updateCollection, isUpdating } = useUpdateCollection();
  useEffect(() => {
    setFormData({
      id: collection?.id,
      title: collection?.title,
      description: collection?.description,
    });
  }, [collection, showModal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCollection(formData, {
      onSettled: () => {
        setShowModal(false);
      },
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <h5 className="m-0">{t("cart.editCollection")}</h5>
      </Modal.Header>
      <Modal.Body className="pay_modal collection_modal">
        <form className="form_ui m-0" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <InputField
                label={t("cart.collectionTitle")}
                name="title"
                type="text"
                id="title"
                required={true}
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 p-2">
              <TextField
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                label={t("cart.collectionDescription")}
              />
            </div>

            <div className="col-12 p-2 d-flex gap-3 mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="cancel-btn"
              >
                {t("cancel")}
              </button>
              <SubmitButton
                name={t("cart.edit")}
                loading={isUpdating}
                className={"order-now"}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCollectionModal;
