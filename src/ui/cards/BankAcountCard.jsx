import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useDeleteBanks from "../../hooks/banks/useDeleteBanks";
import ConfirmationModal from "../modals/ConfirmationModal";

function BankAcountCard({ targetBank, setShowModal, setTargetBank, bank }) {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteBank, isPending } = useDeleteBanks();

  const handleDeleteBanks = () => {
    deleteBank(targetBank?.id, {
      onSettled: () => {
        setTargetBank("");
        setShowConfirmation(false);
      },
    });
  };
  const handleEdit = () => {
    setShowModal(true);
    setTargetBank(bank);
  };

  return (
    <>
      <div className="bank-acc-card">
        <div className="image-wrapper">
          <i className="fa-sharp fa-regular fa-building-columns"></i>
        </div>
        <div className="info-wrapper">
          <h5>{bank?.user_name}</h5>
          <div className="info-boxes-wrapper">
            {(bank?.city || bank?.area) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span className="box-value">{`${
                  bank.city ? bank.city + "" : ""
                } ${bank.city && bank.area ? ", " : ""} ${
                  bank.area ? bank.area : ""
                }`}</span>
              </div>
            )}
            {(bank?.address1 || bank?.address2) && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-house"></i>
                </span>
                <span className="box-value">{`${
                  bank.address1 ? bank.address1 + "" : ""
                } ${bank.address2 && bank.address2 ? ", " : ""} ${
                  bank.address2 ? bank.address2 : ""
                }`}</span>
              </div>
            )}
            {bank?.iban && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-regular fa-money-check"></i>
                </span>
                <span className="box-value">{bank.iban}</span>
              </div>
            )}
            {bank?.swift && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-solid fa-globe"></i>
                </span>
                <span className="box-value">{bank.swift}</span>
              </div>
            )}
            {bank?.zip && (
              <div className="info-box">
                <span className="box-title">
                  <i className="fa-sharp fa-regular fa-envelopes-bulk"></i>
                </span>
                <span className="box-value">{bank.zip}</span>
              </div>
            )}
          </div>
        </div>
        <div className="icons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetBank(bank?.id);
              handleEdit();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTargetBank(bank);
              setShowConfirmation(true);
            }}
          >
            <i className="fa-regular fa-trash"></i>
          </button>
        </div>
      </div>

      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDeleteBanks}
        loading={isPending}
        buttonText={t("profile.delete")}
        text={t("manageAccounts.areYouSureYouWantToDelete")}
      />
    </>
  );
}

export default BankAcountCard;
