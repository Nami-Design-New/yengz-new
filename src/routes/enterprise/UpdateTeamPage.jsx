import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useGetTeamUpdateDetails from "../../hooks/orgs/useGetTeamUpdateDetails";
import usePostUpdateCompanyTeam from "../../hooks/orgs/usePostUpdateCompanyTeam";
import EmailSelect from "../../ui/enterprise/EmailSelect";

const UpdateTeamPage = () => {
  const { t } = useTranslation();
  const { link, id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: updateTeamDetailsData } = useGetTeamUpdateDetails(link, id);
  const { handleUpdateCompanyTeam, isPending } = usePostUpdateCompanyTeam();

  const [formData, setFormData] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);

  // ✅ تحميل البيانات القادمة من API في الفورم
  useEffect(() => {
    if (updateTeamDetailsData) {
      const team = updateTeamDetailsData;

      // حفظ كل البيانات كما هي عشان ما يضيعش أي جزء
      setFormData({
        ...team,
        user_name: link,
      });

      if (team.members) {
        setSelectedUsers(
          team.members.map((m) => ({
            value: m.user.id,
            label: m.user.name,
          }))
        );
      }
    }
  }, [updateTeamDetailsData, link]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckbox = (field, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? 1 : 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      user_name: link,
      team_id: id,
      name: formData.name,
      description: formData.description,
      manage_member_projects: formData.manage_member_projects,
      manage_team_projects: formData.manage_team_projects,
      manage_company_projects: formData.manage_company_projects,
      manage_member_offers: formData.manage_member_offers,
      manage_team_offer: formData.manage_team_offer,
      manage_company_offers: formData.manage_company_offers,
      manage_member_deals: formData.manage_member_deals,
      manage_team_deals: formData.manage_team_deals,
      manage_company_deals: formData.manage_company_deals,
      manage_team_freelance: formData.manage_team_freelance,
      manage_company_freelance: formData.manage_company_freelance,
      manage_member_finance: formData.manage_member_finance,
      manage_company_finance: formData.manage_company_finance,
      manage_team_finance: formData.manage_team_finance,
      manage_member_notes: formData.manage_member_notes,
      manage_company_notes: formData.manage_company_notes,
      manage_team_notes: formData.manage_team_notes,
      manage_team_members: formData.manage_team_members,
      manage_company_members: formData.manage_company_members,
      view_team: formData.view_team,
      add_team: formData.add_team,
      update_team: formData.update_team,
      delete_team: formData.delete_team,
      update_company: formData.update_company,
      members_ids: selectedUsers.map((u) => u.value),
    };

    console.log("📤 Sending payload:", payload);

    handleUpdateCompanyTeam(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["companyTeam"]);
        navigate(`/orgs/${link}/teams`);
      },
    });
  };

  if (!updateTeamDetailsData) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="container my-4">
      <h5 className="mb-3">
        {t("enterprise.createenterprise.orgs.team.addPermissions")}
      </h5>

      <form onSubmit={handleSubmit}>
        {/* الاسم */}
        <div className="mb-3">
          <label className="form-label">
            {t("enterprise.createenterprise.orgs.team.name")}
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t("enterprise.createenterprise.orgs.team.enterName")}
            required
          />
        </div>

        {/* الوصف */}
        <div className="mb-3">
          <label className="form-label">
            {t("enterprise.createenterprise.orgs.team.description")}
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={t(
              "enterprise.createenterprise.orgs.team.enterDescription"
            )}
          ></textarea>
        </div>

        {/* اختيار الأعضاء */}
        <div className="mb-3">
          <EmailSelect
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>

        {/* الصلاحيات */}
        <div className="mb-3">
          {/* المشاريع */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.projects")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_member_projects === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_member_projects", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.memberProjects")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_projects === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_projects", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamProjects")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_projects === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_projects", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgProjects")}
                </label>
              </div>
            </div>
          </div>
          {/* العروض */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.offers")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_member_offers === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_member_offers", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.memberOffers")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_offer === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_offer", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamOffers")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_offers === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_offers", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgOffers")}
                </label>
              </div>
            </div>
          </div>
          {/* الصفقات */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.deals")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_member_deals === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_member_deals", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.memberDeals")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_deals === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_deals", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamDeals")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_deals === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_deals", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgDeals")}
                </label>
              </div>
            </div>
          </div>
          {/* المستقلين */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.freelancers")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_freelance === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_freelance", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamFreelancers")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_freelance === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_freelance", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgFreelancers")}
                </label>
              </div>
            </div>
          </div>
          {/* المالية */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.finance")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_member_finance === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_member_finance", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.memberFinance")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_finance === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_finance", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamFinance")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_finance === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_finance", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgFinance")}
                </label>
              </div>
            </div>
          </div>
          {/* الملاحظات */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.notes")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_member_notes === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_member_notes", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.memberNotes")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_notes === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_notes", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamNotes")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_notes === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_notes", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgNotes")}
                </label>
              </div>
            </div>
          </div>
          {/* الأعضاء */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.members")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_team_members === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_team_members", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.teamMembers")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.manage_company_members === 1}
                  onChange={(e) =>
                    handleCheckbox("manage_company_members", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.orgMembers")}
                </label>
              </div>
            </div>
          </div>
          {/* صلاحيات المؤسسة */}
          <div>
            <h6 className="fw-bold mb-2 p-3 bg-light">
              {t("enterprise.createenterprise.orgs.team.orgPermissions")}
            </h6>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.view_team === 1}
                  onChange={(e) =>
                    handleCheckbox("view_team", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.browseTeams")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.add_team === 1}
                  onChange={(e) => handleCheckbox("add_team", e.target.checked)}
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.addTeam")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.update_team === 1}
                  onChange={(e) =>
                    handleCheckbox("update_team", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.editTeams")}
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between p-3">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.delete_team === 1}
                  onChange={(e) =>
                    handleCheckbox("delete_team", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.deleteTeams")}
                </label>
              </div>
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={formData.update_company === 1}
                  onChange={(e) =>
                    handleCheckbox("update_company", e.target.checked)
                  }
                />
                <label className="form-check-label">
                  {t("enterprise.createenterprise.orgs.team.editOrg")}
                </label>
              </div>
            </div>
          </div>{" "}
        </div>

        {/* زر الحفظ */}
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending
            ? t("enterprise.createenterprise.orgs.team.saving")
            : t("enterprise.createenterprise.orgs.team.save")}
        </button>
      </form>
    </div>
  );
};

export default UpdateTeamPage;
