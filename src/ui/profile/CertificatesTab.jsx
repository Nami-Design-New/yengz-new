import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useDeleteCertificate from "../../hooks/certificate/useDeleteCertificate";
import useGetCertificates from "../../hooks/certificate/useGetCertificates";
import CertificateCard from "../cards/CertificateCard";
import ConfirmationModal from "../modals/ConfirmationModal";
import AddCertificateModal from "../modals/AddCertificateModal";
import CertificateViewModal from "../modals/CertificateViewModal";

const CertificatesTab = ({ user, isMyAccount }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddCertificateModal, setShowAddCertificateModal] = useState(false);
  const [viewImgTarget, setViewImgTarget] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [targetCertificate, setTargetCertificate] = useState(null);
  const [showCertificateViewModal, setShowCertificateViewModal] =
    useState(false);
  const { t } = useTranslation();
  const { data: certificates } = useGetCertificates(user?.id);
  const { deleteCertificate, isPending } = useDeleteCertificate();
  const onDeleteModalShow = (id) => {
    setShowConfirmation(true);
    setTargetId(id);
  };

  const onEditModalShow = (certificate) => {
    setShowAddCertificateModal(true);
    setTargetCertificate(certificate);
  };

  const handleDelete = () => {
    deleteCertificate(targetId, {
      onSettled: () => {
        setShowConfirmation(false);
      },
    });
  };

  const viewCertificate = (targetCertificate) => {
    setShowCertificateViewModal(true);
    setViewImgTarget(targetCertificate);
  };

  return (
    <div className="tab-pane ">
      <div className="services-container">
        {isMyAccount && (
          <button
            onClick={() => setShowAddCertificateModal(true)}
            className="add-service"
          >
            <i className="fa-regular fa-circle-plus"></i>{" "}
            {t("profile.addCertificate")}
          </button>
        )}
        <div className="services_grid">
          {certificates?.length === 0 ? (
            <div className="noDataFound">
              <h4>{t("profile.noCertificatesFound")}</h4>
            </div>
          ) : (
            <>
              {certificates?.map((cer) => (
                <CertificateCard
                  canEdit={isMyAccount}
                  key={cer.id}
                  certificate={cer}
                  onClick={viewCertificate}
                  onEditModalShow={onEditModalShow}
                  onDeleteModalShow={onDeleteModalShow}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        loading={isPending}
        eventFun={handleDelete}
        buttonText={t("profile.delete")}
        text={t("profile.areYouSureYouWantToDeleteCertificate")}
      />
      <AddCertificateModal
        setTargetCertificate={setTargetCertificate}
        targetCertificate={targetCertificate}
        showModal={showAddCertificateModal}
        setShowModal={setShowAddCertificateModal}
      />
      <CertificateViewModal
        targetCertificate={viewImgTarget}
        showModal={showCertificateViewModal}
        setShowModal={setShowCertificateViewModal}
      />
    </div>
  );
};

export default CertificatesTab;
