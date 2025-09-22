import React from "react";
import AddButton from "../AddButton ";
import { useTranslation } from "react-i18next";

const ProjectSummary = ({
  onAddClick,
  buttonText,
  buttonIcon,
  title = "enterprise.details.projects",
  companyDetailsData
}) => {
  const { t } = useTranslation();

  return (
    <div className="project-summary">
      <h4>{t(title)}</h4>
      <p className="my-2">{companyDetailsData.projects_count}</p>
      {buttonText && (
        <AddButton
          text={buttonText}
          icon={buttonIcon || <i className="fa-regular fa-plus"></i>}
          onClick={onAddClick}
        />
      )}
    </div>
  );
};

export default ProjectSummary;
