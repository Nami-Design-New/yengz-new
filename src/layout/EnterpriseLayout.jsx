import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import AddButton from "../ui/enterprise/AddButton ";
import PageHeader from "../ui/enterprise/createEnterprise/PageHeader";
import useGetCompanyDetails from "../hooks/orgs/useGetCompanyDetails";
import DataLoader from "../ui/DataLoader";
import usePostAcceptSponsorInvitation from "../hooks/orgs/usePostAcceptSponsorInvitation";
import { toast } from "sonner";
import usePostRejectSponsorInvitation from "../hooks/orgs/usePostRejectSponsorInvitation";
import ErrorPage from "../routes/ErrorPage";
import useLeaveCompany from "../hooks/orgs/useLeaveCompany";

const EnterpriseLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const { link } = useParams();
  const { data: companyDetailsData, isLoading } = useGetCompanyDetails(link);
  const { handleLeaveCompany } = useLeaveCompany(link);

  const { handleAcceptInvite } = usePostAcceptSponsorInvitation();
  const { handleRejectInvite } = usePostRejectSponsorInvitation();
  function onSubmitAccept(data) {
    handleAcceptInvite(
      {
        user_name: data,
      },
      {
        onSuccess: () => {
          toast.success(t("enterprise.messages.successAcceptInvite"));
        },
        onError: (error) => {
          toast.error(
            error?.response?.message ||
              t("enterprise.messages.failAcceptInvite")
          );
        },
      }
    );
  }
  function onSubmitReject(data) {
    handleRejectInvite(
      {
        user_name: data,
      },
      {
        onSuccess: () => {
          toast.success(t("enterprise.messages.successRejectInvite"));
        },
        onError: (error) => {
          toast.error(
            error?.response?.message ||
              t("enterprise.messages.failRejectInvite")
          );
        },
      }
    );
  }
  function onSubmitLeaveCompany(userName) {
    handleLeaveCompany(
      {
        user_name: userName,
      },
      {
        onSuccess: () => {
          toast.success(t("enterprise.messages.successLeave"));
          navigate("/orgs");
        },
        onError: (error) => {
          toast.error(
            error?.response?.message || t("enterprise.messages.failedLeave")
          );
        },
      }
    );
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !companyDetailsData) {
    return <ErrorPage />;
  }
  return (
    <section className="enterprise-layout p-90">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end">
          <PageHeader showHome={true} />
          {lastSegment === "edit" && null}
          {companyDetailsData.can_add_members && lastSegment === "teams" && (
            <AddButton
              text={t("enterprise.orgs.addTeam")}
              icon={<i className="fa-regular fa-plus"></i>}
              onClick={() => navigate(`/orgs/${link}/teams/create`)}
            />
          )}
          {}
        </div>
        {companyDetailsData.show_sponsor_message && (
          <div className="p-4 bg-warning bg-opacity-25 mt-5">
            <h2>{t("enterprise.messages.inviteSponsor")}</h2>
            <p>
              {t("enterprise.messages.sendForYou")}{" "}
              <span className="fw-bolder">{companyDetailsData.user.name}</span>{" "}
              {t("enterprise.messages.inviteSponsor2")}
            </p>
            <div className="d-flex gap-2 mt-1">
              <button
                onClick={() => onSubmitAccept(link)}
                className="d-block bg-info text-white border-none"
                variant="transparent"
              >
                {t("enterprise.messages.accept")}
              </button>
              <button
                onClick={() => onSubmitReject(link)}
                className="d-block"
                variant="transparent"
              >
                {t("enterprise.messages.reject")}
              </button>
            </div>
          </div>
        )}
        <div className="row  mt-5">
          <div className="col-12 col-md-4 p-2 ">
            <div className="right-side">
              <div className="profile-card">
                {lastSegment === "edit" ? (
                  <label
                    htmlFor="enterprie-image"
                    className="enterprise__edit--image"
                  >
                    <div className="image__wrapper">
                      <span className="overlay">
                        <i className="fa-regular fa-camera"></i>
                      </span>
                      <img
                        src={
                          previewImage ? previewImage : companyDetailsData.image
                        }
                        // ref={backIdImage}
                        alt="gallery"
                      />
                    </div>
                    <input
                      type="file"
                      required={true}
                      name="image"
                      id="enterprie-image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </label>
                ) : (
                  <Link to={""}>
                    <img src={companyDetailsData.image} />
                  </Link>
                )}
                <p>{companyDetailsData.name}</p>
              </div>
              <div className="settings">
                <h3>{t("enterprise.settings.title")}</h3>
                <ul className="orgs-links">
                  {companyDetailsData.update_company && (
                    <li className="org-link">
                      <NavLink
                        to="edit"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fa-solid fa-sliders"></i>
                        <span>{t("enterprise.settings.editEnterprise")}</span>
                      </NavLink>
                    </li>
                  )}
                  <li className="org-link">
                    <NavLink
                      to="teams"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa-solid fa-table"></i>
                      <span>{t("enterprise.settings.teams")}</span>
                    </NavLink>
                  </li>
                  {companyDetailsData.update_sponsor && (
                    <li className="org-link">
                      <NavLink
                        to="funding"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fa-solid fa-money-bill"></i>
                        <span>{t("enterprise.settings.funding")}</span>
                      </NavLink>
                    </li>
                  )}
                  {companyDetailsData.can_leave && (
                    <li className="org-link">
                      <NavLink
                        onClick={() => onSubmitLeaveCompany(link)}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fa-solid fa-money-bill"></i>
                        <span>{t("enterprise.settings.leave")}</span>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseLayout;
