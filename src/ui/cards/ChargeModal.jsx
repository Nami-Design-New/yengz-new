import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import InputField from "../forms/SubmitButton";

const ChargeModal = ({ showModal, setShowModal, cartTotalPrice }) => {
  const { t } = useTranslation();
  const [chargeValue, setChargeValue] = useState("");
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="pay_modal">
        {cartTotalPrice && (
          <h3 className="text-center">
            {t("cart.youDontHaveEnoughBallance")}{" "}
            <span>
              {cartTotalPrice}
              <i className="fa-solid fa-dollar-sign"></i>
            </span>
          </h3>
        )}

        <form className="form_ui">
          <InputField
            type="number"
            id="chargeValue"
            name="chargeValue"
            placeholder={"00"}
            value={chargeValue}
            label={t("enterChargeValue")}
            onChange={(e) => setChargeValue(e.target.value)}
          />
        </form>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <Link
            className="order-now text-center"
            to={
              chargeValue === 0 || chargeValue === ""
                ? ""
                : `https://api.ynjez.com/payment/${chargeValue}?Authorization=${token}&Redirect_url=${window.location.href}`
            }
          >
            {t("cart.chargeWallet")}
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChargeModal;
