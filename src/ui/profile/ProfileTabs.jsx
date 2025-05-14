import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGetUserProjects from "../../hooks/projects/useGetUserProjects";
import { useDeleteService } from "../../hooks/services/useDeleteService";
import useUserServices from "../../hooks/services/useUserServices";
import useGetWorks from "../../hooks/works/useGetWorks";
import ConfirmationModal from "../modals/ConfirmationModal";
import ServiceCard from "../cards/ServiceCard";
import DataLoader from "../DataLoader";
import ProjectCard from "../cards/ProjectCard";
import WorksTab from "./WorksTab";
import CertificatesTab from "./CertificatesTab";

const ProfileTabs = ({ user, isMyAccount }) => {
  const { t } = useTranslation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const { data: services } = useUserServices(user?.id);
  const { data: myProjects, isLoading } = useGetUserProjects(user?.id);
  const { data: works } = useGetWorks(user?.id);
  const { deleteService, isPending } = useDeleteService();
  const handleDelete = (id) => {
    setShowConfirmation(true);
    setServiceId(id);
  };

  const handleDeleteService = () => {
    deleteService(serviceId, {
      onSettled: () => {
        setShowConfirmation(false);
      },
    });
  };

  return (
    <>
      <Tabs defaultActiveKey="about" id="uncontrolled-tab-example">
        {/* about me */}
        <Tab eventKey="about" title={t("profile.aboutMe")} className="tab_item">
          <div className="user_about">
            {user?.about ? (
              <p>{user?.about}</p>
            ) : (
              <>
                {isMyAccount && (
                  <Link to="/edit-profile">
                    <i className="fa-regular fa-circle-plus"></i>{" "}
                    {t("profile.noAbout")}
                  </Link>
                )}
              </>
            )}
          </div>
        </Tab>

        {/* services */}
        <Tab
          eventKey="service"
          title={t("profile.services")}
          className="tab_item"
        >
          <div className="services-container">
            {isMyAccount && (
              <Link to="/service/add" className="add-service">
                <i className="fa-regular fa-circle-plus"></i>{" "}
                {t("profile.addService")}
              </Link>
            )}

            <div className="services_grid">
              {services?.length === 0 ? (
                <div className="noDataFound">
                  <h4>{t("profile.noService")}</h4>
                </div>
              ) : (
                <>
                  {services?.map((service) => (
                    <ServiceCard
                      canEdit={isMyAccount}
                      key={service.id}
                      service={service}
                      handleDelete={handleDelete}
                      showPending={true}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </Tab>

        {/* projects */}
        <Tab
          eventKey="projects"
          title={t("profile.projects")}
          className="tab_item"
        >
          <div className="services-container">
            {isMyAccount && (
              <Link to="/project/add" className="add-service mb-3">
                <i className="fa-regular fa-circle-plus"></i>
                {t("routes.add-project")}
              </Link>
            )}
            {isLoading ? (
              <DataLoader />
            ) : (
              <div className="projects_wrapper">
                {myProjects?.length === 0 ? (
                  <div className="noDataFound">
                    <h4>{t("profile.noProjects")}</h4>
                  </div>
                ) : (
                  <>
                    {myProjects?.map((project) => (
                      <ProjectCard key={project?.id} project={project} />
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </Tab>

        {/* verifications */}
        <Tab
          eventKey="documentation"
          title={t("profile.verification")}
          className="tab_item"
        >
          <div className="tab-pane">
            <ul className="verify-list">
              <li className="d-flex gap-2">
                {user?.verified === 1 ? (
                  <i className="fa-solid fa-badge-check"></i>
                ) : (
                  <i className="fa-regular fa-square-x"></i>
                )}
                {t("profile.personalIdentification")}
              </li>
              <li className="d-flex gap-2">
                {user?.phone_verified === 1 ? (
                  <i className="fa-solid fa-badge-check"></i>
                ) : (
                  <i className="fa-regular fa-square-x"></i>
                )}
                {t("profile.phoneNumber")}
              </li>
              <li className="d-flex gap-2">
                <i className="fa-solid fa-badge-check"></i>
                {t("profile.emailAddress")}
              </li>
            </ul>
            {isMyAccount && (
              <>
                {(user?.verified === 0 || user?.phone_verified === 0) && (
                  <div className="unverified-box mb-3 d-block">
                    <h6>{t("profile.notVerified")}</h6>
                  </div>
                )}
                <div className="d-flex gap-2">
                  {user?.phone_verified === 0 && (
                    <div className="unverified-box">
                      <Link to="/verify-phone">{t("profile.verifyPhone")}</Link>
                    </div>
                  )}
                  {user?.verified === 0 && (
                    <div className="unverified-box">
                      <Link to="/verify-identity">
                        {t("profile.verifyYourIdentity")}
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Tab>

        {/*  statistics */}
        <Tab
          eventKey="statistics"
          title={t("profile.statistics")}
          className="tab_item"
        >
          <div
            className="tab-pane"
            id="pills-statics"
            role="tabpanel"
            aria-labelledby="pills-statics-tab"
          >
            <ul className="statics-list p-2">
              <li className="d-flex justify-content-between">
                <h6>{t("profile.puplidhedServices")}</h6>
                <span>{user?.service_count}</span>
              </li>
              <li className="d-flex justify-content-between">
                <h6>{t("profile.clientsNumber")}</h6>
                <span>{user?.customer_count}</span>
              </li>
            </ul>
          </div>
        </Tab>

        {/* my works */}
        <Tab
          eventKey="My works"
          title={t("profile.myWorks")}
          className="tab_item"
        >
          <WorksTab works={works} isMyAccount={isMyAccount} />
        </Tab>

        {/* my certificates */}
        <Tab
          eventKey="My Certifications"
          title={t("profile.myCertificates")}
          className="tab_item"
        >
          <CertificatesTab user={user} isMyAccount={isMyAccount} />
        </Tab>
      </Tabs>
      <ConfirmationModal
        eventFun={handleDeleteService}
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        loading={isPending}
        text={t("profile.areYouSureWantToDeleteThisService")}
        buttonText={t("profile.deleteService")}
      />
    </>
  );
};

export default ProfileTabs;
