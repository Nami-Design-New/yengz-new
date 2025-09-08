import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import SectionHeader from "../ui/SectionHeader";
import useGetProject from "../hooks/projects/useGetProject";
import useGetProjectRequests from "../hooks/projects/useGetProjectRequests";
import OfferCard from "../ui/cards/OfferCard";
import AboutProjectCard from "../ui/cards/AboutProjectCard";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useGetProject();
  const { data: requests, isLoading: isLoadingRequests } =
    useGetProjectRequests(id, "global");
  const user = useSelector((state) => state.authedUser.user);

useEffect(() => {
  if (
    project?.accepted === 0 &&
    project?.refuse_reason !== null &&
    project?.user?.id !== user?.id
  ) {
    navigate("/projects");
  }
}, [project, user, navigate]);


  if (isLoading || isLoadingRequests) {
    return <DataLoader />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <SectionHeader title={project?.title} />
      <section className="requestDetails">
        <div className="container">
          <div className="row ">
            {project?.refuse_reason !== null && (
              <div className="col-12 p-2 mb-3">
                <div className="refuse_reason">
                  <p>
                    {t("services.refuseReason")}: {project?.refuse_reason}
                  </p>
                </div>
              </div>
            )}
            <div className="col-lg-8 col-12 p-2 d-flex flex-column gap-3">
              {/* post details */}
              <div className="postDetails w-100">
                <h5>
                  <i className="fa-light fa-file"></i>{" "}
                  {t("projects.projectDetails")}
                </h5>
                <p>{project?.description}</p>
                {project?.files?.length > 0 && (
                  <>
                    <h6>{t("projects.attachments")}</h6>
                    <ul>
                      {project?.files?.map((file) => (
                        <li key={file?.id}>
                          <Link
                            to={file?.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fa-regular fa-link"></i> {file?.file}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              {/* add offer */}
              {!project?.is_my_project && !project?.added_request && (
                <>{!project?.added_request && <AddOffer id={project?.id} />}</>
              )}
              {/* piddings */}
              {requests && requests.length > 0 && (
                <div className="allComments">
                  <h5 className="mb-4">
                    <i className="fa-light fa-comment"></i>{" "}
                    {t("projects.offersMade")}{" "}
                  </h5>
                  <div className="d-flex flex-column gap-3">
                    {requests.map((request) => (
                      <OfferCard
                        request={request}
                        key={request.id}
                        isMyProject={project?.is_my_project}
                        project={project}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4 col-12 p-2">
              <AboutProjectCard project={project} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
