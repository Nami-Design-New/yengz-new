import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AddButton from "./AddButton ";
import { Link, useNavigate, useParams } from "react-router";
import { AddMemberModal } from "./AddMemberModal";
import useDeleteCompanyTeam from "../../hooks/orgs/useDeleteCompanyTeam";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const TeamHeader = ({
  id,
  title,
  projects,
  budget,
  canDelete = true,
  canAddMember = true,
  companyDetailsData,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null); // 👈
  const queryClient = useQueryClient();
  const { link } = useParams();

  const { handleDeleteCompanyTeam } = useDeleteCompanyTeam();

  function onSubmitDeleteCompanyTeam(userName, teamId) {
    handleDeleteCompanyTeam(
      { user_name: userName, team_id: teamId },
      {
        onSuccess: () => {
          toast.success(t("team deleted success"));
          queryClient.invalidateQueries(["companyTeam"]);
        },
        onError: (error) => {
          toast.error(error);
        },
      }
    );
  }

  const openModal = () => {
    setSelectedTeamId(id); 
    setIsModalOpen(true);
  };

  return (
    <div className="enterprise-team__header">
      <Link to={`${id}/members`} className="enterprise-team__info-wrapper">
        <h3 className="enterprise-team__title">{title}</h3>
        <div className="enterprise-team__info">
          <span className="enterprise-team__info-item">
            <i className="fa-regular fa-folder"></i>
            {projects || t("enterprise.teams.noProjects", "لا يوجد أي مشاريع")}
          </span>
          <span className="enterprise-team__info-item">
            <i className="fa-regular fa-money-bill"></i>
            {budget || "$0.00 من غير محدودة"}
          </span>
        </div>
      </Link>

      <div className="button__group">
        {companyDetailsData.can_add_members === true ? (
          <AddButton
            text={t("enterprise.orgs.addMember")}
            icon={<i className="fa-regular fa-plus"></i>}
            onClick={openModal}
          />
        ) : canAddMember ? (
          <AddButton
            text={t("enterprise.orgs.addMember")}
            icon={<i className="fa-regular fa-plus"></i>}
            onClick={openModal}
          />
        ) : null}
        <Dropdown>
          <Dropdown.Toggle split id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                navigate(`/orgs/${link}/teams/${id}/edit`);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>{" "}
              {t("enterprise.teams.editTeam", "تعديل الفريق")}
            </Dropdown.Item>
            {canDelete && title !== "المدراء" && (
              <Dropdown.Item
                onClick={() => onSubmitDeleteCompanyTeam(link, id)}
              >
                <i className="fa-regular fa-trash"></i>{" "}
                {t("enterprise.teams.deleteTeam", "حذف الفريق")}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTeamId={selectedTeamId}
      />
    </div>
  );
};

export default TeamHeader;
