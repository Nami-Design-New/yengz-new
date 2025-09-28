import React from "react";
import AddButton from "../AddButton ";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const ProjectSummary = ({
  onAddClick,
  buttonText,
  buttonIcon,
  title = "enterprise.details.projects",
  companyDetailsData,
}) => {
  const { t } = useTranslation();

  return (
    <div className="project-summary">
      <Link to="projects" className="text-black">
        <h4>{t(title)}</h4>
      <p className="my-2">{companyDetailsData.projects_count}</p>
      </Link>
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
