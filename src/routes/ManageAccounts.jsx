import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useBanksList from "../hooks/banks/useBanksList";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/SectionHeader";
import AddAccountModal from "../ui/modals/AddAccountModal";
import BankAcountCard from "../ui/cards/BankAcountCard";

const ManageAccounts = () => {
  const { t } = useTranslation();
  const [targetBank, setTargetBank] = useState(null);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const { isLoading, data: banks } = useBanksList();
  return (
    <>
      <SectionHeader />
      <section className="balance_section">
        <div className="container">
          <div className="blanceHeader">
            <h3>{t("manageAccounts.headerText")}</h3>
            <div className="btns-wrapper">
              <button
                className="btn"
                onClick={() => setShowAddAccountModal(true)}
              >
                <i className="far fa-plus"></i>
                {t("manageAccounts.addAccount")}
              </button>
            </div>
          </div>
          {isLoading ? (
            <DataLoader />
          ) : (
            banks &&
            banks?.length > 0 &&
            banks?.map((bank) => (
              <div className="content-body" key={bank?.id}>
                <BankAcountCard
                  setShowModal={setShowAddAccountModal}
                  setTargetBank={setTargetBank}
                  bank={bank}
                  key={bank?.id}
                  targetBank={targetBank}
                />
              </div>
            ))
          )}
        </div>
      </section>
      <AddAccountModal
        targetBank={targetBank}
        setTargetBank={setTargetBank}
        showModal={showAddAccountModal}
        setShowModal={setShowAddAccountModal}
      />
    </>
  );
};

export default ManageAccounts;
