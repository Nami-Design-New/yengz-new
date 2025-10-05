import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  calculateExpectedEndDate,
  formatTimeDifference,
  getTimeDifference,
} from "../utils/helpers";
import { updateProject } from "../services/apiProjects";
import StarsList from "../ui/StarList";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../utils/constants";
import SubmitButton from "../ui/forms/SubmitButton";
import AddRateModal from "../ui/modals/AddRateModal";
import useGetProject from "../hooks/projects/useGetProject";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";

const ProjectsOrdersDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: project, isLoading } = useGetProject();
  const [userType, setUserType] = useState(null);
  const [btn1Loading, setBtn1Loading] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const quryClient = useQueryClient();
  const user = useSelector((state) => state.authedUser.user);
  const lang = useSelector((state) => state.language.lang);
  const navigate = useNavigate();

  const timeDifference = getTimeDifference(project?.created_at);
  const startTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  let expectedEndDate = calculateExpectedEndDate(
    project?.created_at,
    project?.days
  );

  useEffect(() => {
    if (user?.id && project?.user?.id) {
      if (user?.id === project?.user?.id) {
        setUserType("seller");
      } else {
        setUserType("buyer");
      }
    }
  }, [user?.id, project?.user?.id]);

  const handleupdateProject = async (status) => {
    try {
      status === "canceled" ? setBtn1Loading(true) : setLoading(true);
      await updateProject(project?.id, { status }, quryClient);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
      setBtn1Loading(false);
    }
  };

  const handleCreateRoom = () => {
    sessionStorage.setItem("request_type", "project");
    sessionStorage.setItem("request_id", project?.id);
    sessionStorage.setItem("owner_id", user?.id);
    sessionStorage.setItem("applied_id", project?.user?.id);
    navigate(`/chat`);
  };

  if (isLoading) {
    return <DataLoader />;
  }
  if (!isLoading && !project) {
    return <ErrorPage />;
  }

  return (
    <section className="cart-section container">
      <div className="row">
        {project?.refuse_reason !== null && (
          <div className="col-12 p-2 mb-3">
            <div className="refuse_reason">
              <p>
                {t("services.refuseReason")}: {project?.refuse_reason}
              </p>
            </div>
          </div>
        )}
        <div className="col-12">
          <div className=" container">
            <div className="row justify-content-center">
              <div className="col-lg-9 col-12">
                <div className="products-card d-flex flex-column gap-3">
                  <div className="label d-flex align-items-center gap-2">
                    <i className="fa-regular fa-circle-info"></i>
                    <p className="p-0 m-0">{t("projects.projectCard")}</p>
                  </div>
                  <div className="d-flex justify-content-between flex-lg-row flex-column gap-2">
                    <div className="project_owner">
                      <Link
                        to={`/profile/${project?.user?.id}`}
                        className="img"
                      >
                        <img src={project?.user?.image} alt="user" />
                      </Link>
                      <div className="content">
                        <h5>{project?.title}</h5>
                        <h6>{project?.user?.name}</h6>
                      </div>
                    </div>
                    <div className="service-head mini">
                      <Link
                        to={`/profile/${project?.accepted_request?.user?.id}`}
                        className="request-owner-img"
                      >
                        <img
                          src={project?.accepted_request?.user?.image}
                          alt="service"
                        />
                      </Link>
                      <div className="title requester-title">
                        <Link
                          to={`/profile/${project?.accepted_request?.user?.id}`}
                          className="owner"
                        >
                          <span>{project?.accepted_request?.user?.name}</span>
                        </Link>
                        <StarsList
                          rate={project?.accepted_request?.user?.rate || 0}
                        />
                      </div>
                    </div>
                  </div>

                  <p>{project?.description}</p>
                  {project?.files?.length > 0 && (
                    <>
                      <h6 className="m-0">{t("projects.attachments")}</h6>
                      <ul>
                        {project?.files?.map((file) => (
                          <li key={file?.id} className="p-0">
                            <Link
                              to={file?.file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-regular fa-link"></i>{" "}
                              {file?.file}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="products-card">
                  <ul className="order">
                    <li>
                      <p>{t("recievedOrders.orderNumber")}</p>
                      <div className="price-count">
                        <span className="order-number">#{project?.id}</span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.orderValue")}</p>
                      <div className="price-count">
                        <span className="price">
                          {project?.price}{" "}
                          <i className="fa-regular fa-dollar-sign"></i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.orderDate")}</p>
                      <div className="price-count">
                        <span>{startTime}</span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.expectedDeliveryDate")}</p>
                      <div className="price-count">
                        <span>{expectedEndDate}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="progress-card order-d">
                  <div className="progress-details">
                    <div className="pro-container">
                      <p className="status">
                        {lang === "ar"
                          ? ORDER_STATUS_AR[project?.status]
                          : ORDER_STATUS_EN[project?.status]}
                      </p>
                      <div className="progress">
                        <div
                          className={`progress-bar ${project?.status}`}
                          role="progressbar"
                          style={{
                            width: `${
                              ORDER_STATUS_PERSENTAGE[project?.status]
                            }%`,
                          }}
                          aria-valuenow={
                            ORDER_STATUS_PERSENTAGE[project?.status]
                          }
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <Link
                      to="/chat"
                      className="chat"
                      onClick={handleCreateRoom}
                    >
                      <i className="fa-light fa-message-lines"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 order-buttons">
                {user?.id !== project?.user_id &&
                  project?.status === "in_progress" && (
                    <SubmitButton
                      loading={loading}
                      className="report-order"
                      name={t("recievedOrders.readyForDelevier")}
                      icon={<i className="fa-light fa-circle-check"></i>}
                      onClick={() => handleupdateProject("ready")}
                    />
                  )}
                {user?.id === project?.user_id &&
                  project?.status === "ready" && (
                    <SubmitButton
                      loading={loading}
                      className="report-order"
                      name={t("recievedOrders.recieve")}
                      icon={<i className="fa-light fa-circle-check"></i>}
                      onClick={() => setShowRateModal(true)}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddRateModal
        order={project}
        showModal={showRateModal}
        setShowModal={setShowRateModal}
        onSubmit={async (formData) => {
          try {
            await updateProject( formData, quryClient);
          } finally {
            setShowRateModal(false);
          }
        }}
      />
    </section>
  );
};

export default ProjectsOrdersDetails;
