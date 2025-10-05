import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const AddRateModal = ({ showModal, setShowModal, order, onSubmit }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    work_rate: 0,
    support_rate: 0,
    quality_rate: 0,
    experience_rate: 0,
    time_rate: 0,
    deal_again_rate: 0,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      id: order?.id,
      status: "received",
      ...formData,
    };

    onSubmit(finalData); // ابعته للأب
    setLoading(false);
    setShowModal(false);
    console.log("finalData", finalData);
  };
  const handleRatingChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const StarRating = ({ field, label }) => (
    <div className="mb-3  w-100 d-flex justify-content-between align-items-center p-2">
      <label className="fs-6">{label}</label>
      <div className="star-rating-service">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              type="radio"
              id={`${field}_${star}`}
              name={field}
              value={star}
              checked={formData[field] === star}
              onChange={() => handleRatingChange(field, star)}
              className="d-none"
            />
            <label
              htmlFor={`${field}_${star}`}
              className={formData[field] >= star ? "active" : ""}
              style={{ cursor: "pointer", margin: "0 2px" }}
            >
              <i className="fa-sharp fa-solid fa-star"></i>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("اضافة تقييم")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work  ">
        <div className="login-section  py-0 ">
          <form className="form_ui " onSubmit={handleSubmit}>
            <StarRating field="work_rate" label="Work Rate" />
            <StarRating field="support_rate" label="Support Rate" />
            <StarRating field="quality_rate" label="Quality Rate" />
            <StarRating field="experience_rate" label="Experience Rate" />
            <StarRating field="time_rate" label="Time Rate" />
            <StarRating field="deal_again_rate" label="Deal Again Rate" />

            <TextField
              label={t("comments.addComment")}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />

            <SubmitButton name={t(" نشر واستلام")} loading={loading} />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddRateModal;
