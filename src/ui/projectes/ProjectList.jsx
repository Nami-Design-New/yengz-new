import React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../cards/ProjectCard";
import EmptyData from "../EmptyData";

const ProjectList = ({ searchProjectsList, isFetching }) => {
  const { t } = useTranslation();
  return (
    <>
      {searchProjectsList && searchProjectsList?.length > 0 ? (
        <>
          {searchProjectsList.map((project) => (
            <div className="col-12 p-2" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
          {isFetching && (
            <div className="col-12 p-2">
              <div className="smallLoader">
                <span>
                  {t("search.loading")}{" "}
                  <i className="fa-light fa-loader fa-spin"></i>
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyData minHeight={"300px"}>
          {t("notFoundPlaceholder.noProjectsFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
};

export default ProjectList;
