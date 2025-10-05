import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import useGetCompanyMembers from "../../hooks/orgs/useGetCompanyMembers";
import MultiSelect from "../../ui/forms/MultiSelect";
import { useTranslation } from "react-i18next";

const MembersPage = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState("الأحدث");

  // الفلاتر
  const [filters, setFilters] = useState({
    search: "",
    verified: 0,
    jobTitle: "",
    skills: [],
    categories: [],
    teams: [],
    country: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({});
  const { link } = useParams();

  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: categoriesListData } = useCategoriesList();

  // ✅ تحديث appliedFilters أوتوماتيك عند أي تغيير في filters
  useEffect(() => {
    setAppliedFilters({
      userName: link,
      search: filters.search,
      last_login: 0,
      verified: filters.verified,
      job_title: filters.jobTitle,
      skills: filters.skills,
      categories: filters.categories,
      teams: filters.teams,
      country_id: filters.country,
    });
  }, [filters, link]);

  const { data: companyMembersData, isLoading } =
    useGetCompanyMembers(appliedFilters);

  // handlers
  const handleSkillsChange = (selectedOptions) => {
    setFilters((prev) => ({
      ...prev,
      skills: selectedOptions.map((opt) => opt.value),
    }));
  };

  const handleCategoriesChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  const handleTeamsChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      teams: prev.teams.includes(id)
        ? prev.teams.filter((t) => t !== id)
        : [...prev.teams, id],
    }));
  };

  // sort members
  const sortedMembers = [...(companyMembersData || [])].sort((a, b) => {
    if (sort === "الأحدث") {
      return new Date(b.user.last_login) - new Date(a.user.last_login);
    } else if (sort === "الأقدم") {
      return new Date(a.user.last_login) - new Date(b.user.last_login);
    }
    return 0;
  });

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>{t("membersPage.title")}</h4>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sort}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort("الأحدث")}
                >
                  {t("membersPage.sortNewest")}
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort("الأقدم")}
                >
                  {t("membersPage.sortOldest")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ====== البحث والفلاتر ====== */}
        <div className="col-md-3">
          <div className="p-3">
            <label>{t("messagesPage.search")}</label>
            <input
              type="text"
              className="form-control my-2"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />

            <h6 className="my-4">{t("membersPage.team")}</h6>
            {companyTeamData?.map((team) => (
              <div className="my-2" key={team.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`team-${team.id}`}
                  checked={filters.teams.includes(team.id)}
                  onChange={() => handleTeamsChange(team.id)}
                />
                <label
                  className="form-check-label mx-2"
                  htmlFor={`team-${team.id}`}
                >
                  {team.name}
                </label>
              </div>
            ))}

            <h6 className="my-4">{t("membersPage.categories")}</h6>
            {categoriesListData?.map((cat) => (
              <div className="my-2" key={cat.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  checked={filters.categories.includes(cat.id)}
                  onChange={() => handleCategoriesChange(cat.id)}
                />
                <label
                  className="form-check-label mx-2"
                  htmlFor={`cat-${cat.id}`}
                >
                  {cat.name}
                </label>
              </div>
            ))}

            <label>{t("membersPage.jobTitle")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={filters.jobTitle}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, jobTitle: e.target.value }))
              }
            />

            <div className="col-12 p-2">
              <MultiSelect
                label={t("membersPage.skills")}
                id="skills"
                name="skills"
                selectedOptions={filters.skills.map((id) => ({
                  label: `Skill ${id}`,
                  value: id,
                }))}
                handleChange={handleSkillsChange}
                options={
                  [
                    // { label: "Skill 1", value: 1 },
                    // { label: "Skill 2", value: 2 },
                  ]
                }
              />
            </div>

            <label>{t("membersPage.country")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={filters.country}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, country: e.target.value }))
              }
            />

            <h6 className="my-4">{t("membersPage.title")}</h6>
            <div className="my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="person"
                checked={filters.verified === 1}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    verified: e.target.checked ? 1 : 0,
                  }))
                }
              />
              <label className="form-check-label mx-2" htmlFor="person">
                {t("membersPage.verifiedIdentity")}{" "}
              </label>
            </div>
          </div>
        </div>

        {/* ====== الأعضاء ====== */}
        <div className="col-md-9 bg-white py-4">
          <div>
            {sortedMembers?.length ? (
              sortedMembers.map((member) => (
                <div key={member.id} className="card shadow-sm border mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-3">
                        {member.user.image ? (
                          <img
                            src={member.user.image}
                            alt={member.user.name}
                            className="rounded-circle border"
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-circle border bg-light d-flex align-items-center justify-content-center fw-medium text-secondary"
                            style={{ width: "48px", height: "48px" }}
                          >
                            {member.user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h6 className="fw-semibold mb-0">
                            {member.user.name}
                          </h6>
                          <small className="text-muted">
                            {member.user.role || t("membersPage.noBio")}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 text-muted small mb-4">
                      {member.jobTitle || t("membersPage.noJobTitle")}
                      <span>•</span>
                      <span>
                        {member.user.projects_count}{" "}
                        {t("membersPage.openProjects")}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(member.user.last_login).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <span>
                        {new Date(member.user.last_login).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mt-6">
                      {member.user.teams.map((tag, index) => (
                        <span key={index} className="badge bg-primary">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {isLoading ? (
                  <p>{t("payments.loading")}</p>
                ) : (
                  <div className="text-muted py-5 d-flex align-items-center justify-content-center">
                    {" "}
                    {t("membersPage.noMembers")}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
