import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const AddTeamPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container my-4">
      <h5 className="mb-3">{t("enterprise.createenterprise.orgs.team.addPermissions")}</h5>
      <form>
        {/* الاسم */}
        <div className="mb-3">
          <label className="form-label">
            {t("enterprise.createenterprise.orgs.team.name")}<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t("enterprise.createenterprise.orgs.team.enterName")}
          />
        </div>

        {/* الوصف */}
        <div className="mb-3">
          <label className="form-label">{t("enterprise.createenterprise.orgs.team.description")}</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder={t("enterprise.createenterprise.orgs.team.enterDescription")}
          ></textarea>
        </div>

        {/* الصلاحيات */}
        <div className="mb-3">
          <label className="form-label">{t("enterprise.createenterprise.orgs.team.permissions")}:</label>
          <div>
            {/* المشاريع */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.projects")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="viewProjects" />
                  <label className="form-check-label" htmlFor="viewProjects">
                    {t("enterprise.createenterprise.orgs.team.memberProjects")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamProjects" />
                  <label className="form-check-label" htmlFor="teamProjects">
                    {t("enterprise.createenterprise.orgs.team.teamProjects")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgProjects" />
                  <label className="form-check-label" htmlFor="orgProjects">
                    {t("enterprise.createenterprise.orgs.team.orgProjects")}
                  </label>
                </div>
              </div>
            </div>

            {/* العروض */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.offers")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="viewOffers" />
                  <label className="form-check-label" htmlFor="viewOffers">
                    {t("enterprise.createenterprise.orgs.team.memberOffers")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamOffers" />
                  <label className="form-check-label" htmlFor="teamOffers">
                    {t("enterprise.createenterprise.orgs.team.teamOffers")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgOffers" />
                  <label className="form-check-label" htmlFor="orgOffers">
                    {t("enterprise.createenterprise.orgs.team.orgOffers")}
                  </label>
                </div>
              </div>
            </div>

            {/* الصفقات */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.deals")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="viewDeals" />
                  <label className="form-check-label" htmlFor="viewDeals">
                    {t("enterprise.createenterprise.orgs.team.memberDeals")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamDeals" />
                  <label className="form-check-label" htmlFor="teamDeals">
                    {t("enterprise.createenterprise.orgs.team.teamDeals")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgDeals" />
                  <label className="form-check-label" htmlFor="orgDeals">
                    {t("enterprise.createenterprise.orgs.team.orgDeals")}
                  </label>
                </div>
              </div>
            </div>

            {/* المستقلين */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.freelancers")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="viewDocs" />
                  <label className="form-check-label" htmlFor="viewDocs">
                    {t("enterprise.createenterprise.orgs.team.memberFreelancers")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamDocs" />
                  <label className="form-check-label" htmlFor="teamDocs">
                    {t("enterprise.createenterprise.orgs.team.teamFreelancers")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgDocs" />
                  <label className="form-check-label" htmlFor="orgDocs">
                    {t("enterprise.createenterprise.orgs.team.orgFreelancers")}
                  </label>
                </div>
              </div>
            </div>

            {/* المعاملات المالية */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.finance")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="viewFinance" />
                  <label className="form-check-label" htmlFor="viewFinance">
                    {t("enterprise.createenterprise.orgs.team.memberFinance")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamFinance" />
                  <label className="form-check-label" htmlFor="teamFinance">
                    {t("enterprise.createenterprise.orgs.team.teamFinance")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgFinance" />
                  <label className="form-check-label" htmlFor="orgFinance">
                    {t("enterprise.createenterprise.orgs.team.orgFinance")}
                  </label>
                </div>
              </div>
            </div>

            {/* الملاحظات */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.notes")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="memberNotes" />
                  <label className="form-check-label" htmlFor="memberNotes">
                    {t("enterprise.createenterprise.orgs.team.memberNotes")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamNotes" />
                  <label className="form-check-label" htmlFor="teamNotes">
                    {t("enterprise.createenterprise.orgs.team.teamNotes")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgNotes" />
                  <label className="form-check-label" htmlFor="orgNotes">
                    {t("enterprise.createenterprise.orgs.team.orgNotes")}
                  </label>
                </div>
              </div>
            </div>

            {/* أعضاء المؤسسة */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.members")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="selfMembership" />
                  <label className="form-check-label" htmlFor="selfMembership">
                    {t("enterprise.createenterprise.orgs.team.selfMembership")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="teamMembers" />
                  <label className="form-check-label" htmlFor="teamMembers">
                    {t("enterprise.createenterprise.orgs.team.teamMembers")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="orgMembers" />
                  <label className="form-check-label" htmlFor="orgMembers">
                    {t("enterprise.createenterprise.orgs.team.orgMembers")}
                  </label>
                </div>
              </div>
            </div>

            {/* صلاحيات المؤسسة */}
            <div>
              <h6 className="fw-bold mb-2 p-3 bg-light">{t("enterprise.createenterprise.orgs.team.orgPermissions")}</h6>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="browseTeams" />
                  <label className="form-check-label" htmlFor="browseTeams">
                    {t("enterprise.createenterprise.orgs.team.browseTeams")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="addTeam" />
                  <label className="form-check-label" htmlFor="addTeam">
                    {t("enterprise.createenterprise.orgs.team.addTeam")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="editTeams" />
                  <label className="form-check-label" htmlFor="editTeams">
                    {t("enterprise.createenterprise.orgs.team.editTeams")}
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between p-3">
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="deleteTeams" />
                  <label className="form-check-label" htmlFor="deleteTeams">
                    {t("enterprise.createenterprise.orgs.team.deleteTeams")}
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input className="ms-1" type="checkbox" id="editOrg" />
                  <label className="form-check-label" htmlFor="editOrg">
                    {t("enterprise.createenterprise.orgs.team.editOrg")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {t("enterprise.createenterprise.orgs.team.save")}
        </button>
      </form>
    </div>
  );
};

export default AddTeamPage;
