import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteWork } from "../../hooks/works/useDeleteWork";
import ConfirmationModal from "../modals/ConfirmationModal";
import WorkViewModal from "../modals/WorkViewModal";
import AddWorkModal from "../modals/AddWorkModal";
import WorkCard from "../cards/WorkCard";

const WorksTab = ({ works, isMyAccount }) => {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [showWorkViewModal, setShowWorkViewModal] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [targetWork, setTargetWork] = useState(null);
  const [targetWorkViewModal, setTargetWorkViewModal] = useState(null);
  const { deleteWork, isPending } = useDeleteWork();

  const onDeleteModalShow = (id) => {
    setShowConfirmation(true);
    setTargetId(id);
  };

  const onEditModalShow = (work) => {
    setShowAddWorkModal(true);
    setTargetWork(work);
  };

  const onViewModalShow = (work) => {
    setShowWorkViewModal(true);
    setTargetWorkViewModal(work);
  };

  const handleDelete = () => {
    deleteWork(targetId, {
      onSettled: () => {
        setShowConfirmation(false);
      },
    });
  };

  return (
    <>
      <div className="tab-pane ">
        <div className="services-container">
          {isMyAccount && (
            <button
              onClick={() => setShowAddWorkModal(true)}
              className="add-service"
            >
              <i className="fa-regular fa-circle-plus"></i>{" "}
              {t("profile.addWork")}
            </button>
          )}
          <div className="services_grid">
            {works?.length === 0 ? (
              <div className="noDataFound">
                <h4>{t("profile.noWorksFound")}</h4>
              </div>
            ) : (
              <>
                {works?.map((work) => (
                  <WorkCard
                    canEdit={isMyAccount}
                    key={work.id}
                    work={work}
                    onEditModalShow={onEditModalShow}
                    onDeleteModalShow={onDeleteModalShow}
                    onViewModalShow={onViewModalShow}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        type="delete"
        eventFun={handleDelete}
        loading={isPending}
        buttonText={t("profile.delete")}
        text={t("profile.areYouSureYouWantToDelete")}
      />
      <AddWorkModal
        targetWork={targetWork}
        setTargetWork={setTargetWork}
        showModal={showAddWorkModal}
        setShowModal={setShowAddWorkModal}
      />

      <WorkViewModal
        showModal={showWorkViewModal}
        setShowModal={setShowWorkViewModal}
        targetWork={targetWorkViewModal}
        setTargetWork={setTargetWorkViewModal}
      />
    </>
  );
};

export default WorksTab;
