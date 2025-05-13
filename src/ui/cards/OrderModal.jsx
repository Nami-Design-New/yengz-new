import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import walletAnimation from "../../assets/lotties/wallet.json";
import SubmitButton from "../forms/SubmitButton";
import Lottie from "react-lottie";

const OrderModal = ({
  showModal,
  setShowModal,
  ballance,
  cartTotalPrice,
  eventFunction,
  loading,
}) => {
  const { t } = useTranslation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: walletAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="pay_modal">
        <div className="current_ballance">
          <Lottie
            options={defaultOptions}
            height={150}
            width={150}
            className="icon"
          />
        </div>
        <h3>
          {t("cart.currentBallance")}:{" "}
          <span>
            {ballance}
            <i className="fa-solid fa-dollar-sign"></i>
          </span>
        </h3>
        <h3>
          {t("cart.valueWillbediscountedfromyourballance")}{" "}
          <span>
            {cartTotalPrice}
            <i className="fa-solid fa-dollar-sign"></i>
          </span>{" "}
          {t("cart.fromYourWallet")}
        </h3>
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <SubmitButton
            name={t("services.orderNow")}
            loading={loading}
            onClick={eventFunction}
            className="order-now"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
