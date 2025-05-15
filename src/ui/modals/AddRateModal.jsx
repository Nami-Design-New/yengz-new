import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { createRate } from "../../services/apiServices";
import { toast } from "sonner";
import TextField from "../forms/TextField";
import SubmitButton from "../forms/SubmitButton";

const AddRateModal = ({ showModal, setShowModal, order }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rate: 0,
    comment: "",
    service_id: order?.service?.id,
  });

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rate: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { code, message } = await createRate(formData);
      if (code === 200) {
        toast.success(t("comments.createSuccess"));
        navigate("/purchases");
      } else {
        toast.error(message);
      }
      setShowModal(false);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("comments.addComment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form className="form_ui" onSubmit={handleSubmit}>
            <div className="stars">
              <div className="star-rating-service">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`star${star}`}
                      name="rating"
                      value={star}
                      checked={formData.rate === star}
                      onChange={() => handleRatingChange(star)}
                    />
                    <label
                      htmlFor={`star${star}`}
                      title={`${star} stars`}
                      className={formData.rate >= star ? "active" : ""}
                    >
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <TextField
              label={t("comments.addComment")}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
            <SubmitButton name={t("comments.publish")} loading={loading} />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddRateModal;
