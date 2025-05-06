import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import AddButton from "../ui/enterprise/AddButton ";
import PageHeader from "../ui/enterprise/createEnterprise/PageHeader";

const EnterpriseLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [previewImage, setPreviewImage] = useState(null);
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

  return (
    <section className="enterprise-layout p-90">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end">
          <PageHeader showHome={true} />
          {lastSegment === "edit" && null}
          {lastSegment === "teams" && (
            <AddButton
              text={t("enterprise.orgs.addTeam")}
              icon={<i className="fa-regular fa-plus"></i>}
              onClick={() => alert("Member added!")}
            />
          )}
          {}
        </div>
        <div className="row  mt-5">
          <div className="col-12 col-md-4 p-2">
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
                          previewImage
                            ? previewImage
                            : "/images/enterprise/organization_default.png"
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
                    <img src="/images/enterprise/organization_default.png" />
                  </Link>
                )}
                <p>{t("enterprise.profile.description")}</p>
              </div>
              <div className="settings">
                <h3>{t("enterprise.settings.title")}</h3>
                <ul className="orgs-links">
                  <li className="org-link">
                    <NavLink
                      to="edit"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa-solid fa-sliders"></i>
                      <span>{t("enterprise.settings.editEnterprise")}</span>
                    </NavLink>
                  </li>
                  <li className="org-link">
                    <NavLink
                      to="teams"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa-solid fa-table"></i>
                      <span>{t("enterprise.settings.teams")}</span>
                    </NavLink>
                  </li>
                  <li className="org-link">
                    <NavLink
                      to="funding"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <i className="fa-solid fa-money-bill"></i>
                      <span>{t("enterprise.settings.funding")}</span>
                    </NavLink>
                  </li>
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
