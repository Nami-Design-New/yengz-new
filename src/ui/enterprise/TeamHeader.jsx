import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AddButton from "./AddButton ";
import { useNavigate } from "react-router";

const TeamHeader = ({
  title,
  projects,
  budget,
  canDelete = true,
  canAddMember = true,
  companyDetailsData,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="enterprise-team__header">
      <div className="enterprise-team__info-wrapper">
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
      </div>

      <div className="button__group">
        {companyDetailsData.can_add_members === true ? (
          <AddButton
            text={t("enterprise.orgs.addMember")}
            icon={<i className="fa-regular fa-plus"></i>}
            onClick={navigate("/")}
          />
        ) : canAddMember ? (
          <AddButton
            text={t("enterprise.orgs.addMember")}
            icon={<i className="fa-regular fa-plus"></i>}
            onClick={navigate("/")}
          />
        ) : null}
        <Dropdown>
          <Dropdown.Toggle split id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item>
              <i className="fa-solid fa-pen-to-square"></i>{" "}
              {t("enterprise.teams.editTeam", "تعديل الفريق")}
            </Dropdown.Item>
            {canDelete && title !== "المدراء" && (
              <Dropdown.Item>
                <i className="fa-regular fa-trash"></i>{" "}
                {t("enterprise.teams.deleteTeam", "حذف الفريق")}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default TeamHeader;
