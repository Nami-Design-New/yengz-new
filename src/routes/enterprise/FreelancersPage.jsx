import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import { Star } from "lucide-react";
import useGetCompanyFreelancers from "../../hooks/orgs/useGetCompanyFreelancers";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useCategoriesList from "../../hooks/categories/useCategoriesList";

const FreelancersPage = () => {
  const { link } = useParams();

  // الفلاتر
  const [filters, setFilters] = useState({
    user_name: link, // إلزامي
    search: "",
    verified: 0,
    last_login: 0,
    job_title: "",
    skills: [],
    categories: [],
    company_team_ids: [],
    country_id: "",
    rate: 0,
  });

  // جلب البيانات
  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: categoriesListData } = useCategoriesList();
  const { data: companyFreelancersData } = useGetCompanyFreelancers(filters);

  // Handlers
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
      company_team_ids: prev.company_team_ids.includes(id)
        ? prev.company_team_ids.filter((t) => t !== id)
        : [...prev.company_team_ids, id],
    }));
  };

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100" dir="rtl">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-start align-items-center p-5">
          <h4>ابحث عن مستقلين</h4>
        </div>

        {/* ====== الفلاتر ====== */}
        <div className="col-md-3">
          <div className="p-3">
            <label htmlFor="search">بحث</label>
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              type="text"
              className="form-control my-2"
            />

            {/* التقييم */}
            <div className="my-4">
              <label className="form-label d-block ">التقييم</label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, rate: star }))
                    }
                    style={{ cursor: "pointer" }}
                    className={
                      filters.rate >= star ? "text-warning" : "text-secondary"
                    }
                    fill={filters.rate >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            {/* الفريق */}
            <h6 className="my-4">الفريق</h6>
            {companyTeamData?.map((team) => (
              <div key={team.id} className="my-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`team-${team.id}`}
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

            {/* التخصص */}
            <h6 className="my-4">التخصص</h6>
            {categoriesListData?.map((cat) => (
              <div key={cat.id} className="my-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`cat-${cat.id}`}
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

            {/* الدولة */}
            <label className="mt-3">الدولة</label>
            <input
              type="text"
              className="form-control my-2"
              value={filters.country_id}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, country_id: e.target.value }))
              }
            />

            {/* الأعضاء */}
            <h6 className="my-4">الأعضاء</h6>
            <div className="my-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="verified"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    verified: e.target.checked ? 1 : 0,
                  }))
                }
              />
              <label className="form-check-label mx-2" htmlFor="verified">
                هوية موثّقة
              </label>
            </div>
            <div className="my-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="online"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    last_login: e.target.checked ? 1 : 0,
                  }))
                }
              />
              <label className="form-check-label mx-2" htmlFor="online">
                المتصلون الآن
              </label>
            </div>
          </div>
        </div>

        {/* ====== عرض المستقلين ====== */}
        <div className="col-md-9 bg-white py-4">
          {companyFreelancersData?.map((member) => (
            <div key={member.id} className="card shadow-sm border mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
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
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h6 className="fw-semibold mb-0">{member.name}</h6>
                    <small className="text-muted">
                      {member.about || "لم يكتب نبذة شخصية"}
                    </small>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 text-muted small mt-3">
                  {member.category_name || "لم يكتب عنوان وظيفي"}
                  <span>•</span>
                  <span>{member.rate} تقييم</span>
                  <span>•</span>
                  <span>{member.last_login}</span>
                </div>
              </div>
            </div>
          ))}
          {!companyFreelancersData?.length && (
            <p className="text-center text-muted">لا يوجد مستقلين</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancersPage;
