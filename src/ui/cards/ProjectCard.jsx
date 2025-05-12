import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import useTruncateString from "../../hooks/helper/useTruncateString";
import useDeleteProject from "../../hooks/projects/useDeleteProject";
import ConfirmationModal from "../modals/ConfirmationModal";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";

function ProjectCard({ project }) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const [showModal, setShowModal] = useState(false);
  const timeDifference = getTimeDifference(project?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  const truncatedText = useTruncateString(project?.description, 200);
  const { deleteProject, isPending } = useDeleteProject();
  const navigate = useNavigate();
  return (
    <div
      className="project__card"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/projects/${project?.id}`);
      }}
    >
      <div className="row">
        <div className="col-12 p-0">
          <div className="requstPost">
            <div className="d-flex gap-3">
              <Link
                to={`/profile/${project?.user?.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={project?.user?.image} alt="" />
              </Link>
              <div className="postContent">
                <Link
                  to={`/projects/${project?.id}`}
                  className="postTitle"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project?.title}
                </Link>
                <div className="postUser">
                  <Link
                    to={`/profile/${project?.user?.id}`}
                    className="name"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fa-regular fa-user"></i> {project?.user?.name}
                  </Link>
                  <p className="time m-0">
                    <i className="fa-regular fa-timer"></i>
                    {formattedTime}
                  </p>
                  <p className="time m-0">
                    <i className="fa-regular fa-envelope-open-text"></i>
                    {project?.requests_count > 0
                      ? project?.requests_count + " " + t("projects.offer")
                      : t("projects.addFirst")}
                  </p>
                </div>
              </div>
            </div>
            {user?.id === project?.user?.id && (
              <div className="status_action">
                <span className="status">
                  {project?.accepted === 0 && project?.refuse_reason !== null
                    ? t("projects.refused")
                    : project?.status_name}
                </span>
                {(project?.status_name === "جديد" ||
                  project?.status_name === "new") && (
                  <>
                    <Link to={`/edit-project/${project?.id}`}>
                      <i className="fa-regular fa-edit"></i>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowModal(true);
                      }}
                    >
                      <i className="fa-regular fa-trash"></i>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <p className="m-0 mt-3">{truncatedText}</p>
        </div>
      </div>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        buttonText={t("projects.deleteProject")}
        text={t("projects.areYouSureYouWantToDelete")}
        eventFun={deleteProject}
        loading={isPending}
      />
    </div>
  );
}

export default ProjectCard;
