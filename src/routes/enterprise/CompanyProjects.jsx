import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import useGetCompanyProjects from "../../hooks/orgs/useGetCompanyProjects";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";

const CompanyProjects = () => {
  const { link } = useParams();

  const [filters, setFilters] = useState({
    search: "",
    member_name: "",
    freelance_name: "",
    company_team_ids: [],
    status: [],
  });

  const [sort, setSort] = useState("الأحدث");
  const [appliedFilters, setAppliedFilters] = useState({ userName: link });

  const { data: teamData } = useGetCompanyTeam(link);
  const { data: projectsData } = useGetCompanyProjects(appliedFilters);

  useEffect(() => {
    setAppliedFilters({ userName: link, ...filters });
  }, [filters, link]);

  const sortedProjects = [...(projectsData || [])].sort((a, b) => {
    if (sort === "الأحدث") {
      return (
        new Date(b.extra[0]?.created_at) - new Date(a.extra[0]?.created_at)
      );
    } else {
      return (
        new Date(a.extra[0]?.created_at) - new Date(b.extra[0]?.created_at)
      );
    }
  });

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100" dir="rtl">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>مشاريع {link}</h4>
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
                  الأحدث
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSort("الأقدم")}
                >
                  الأقدم
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Sidebar Filters ===== */}
        <div className="col-md-3">
          <div className="p-3">
            <label>بحث</label>
            <input
              type="text"
              className="form-control my-2"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <h6 className="my-4">الفريق</h6>
            {teamData?.map((team) => (
              <div key={team.id} className="my-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      company_team_ids: e.target.checked
                        ? [...prev.company_team_ids, team.id]
                        : prev.company_team_ids.filter((t) => t !== team.id),
                    }));
                  }}
                />
                <label className="mx-2">{team.name}</label>
              </div>
            ))}

            <label>اسم العضو</label>
            <input
              type="text"
              className="form-control my-2"
              onChange={(e) =>
                setFilters({ ...filters, member_name: e.target.value })
              }
            />

            <label>اسم المستقل</label>
            <input
              type="text"
              className="form-control my-2"
              onChange={(e) =>
                setFilters({ ...filters, freelance_name: e.target.value })
              }
            />

            <label>الحالة</label>
            {["new", "draft", "review", "open", "executing"].map((st) => (
              <div key={st} className="my-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.checked
                        ? [...prev.status, st]
                        : prev.status.filter((s) => s !== st),
                    }));
                  }}
                />
                <label className="mx-2">{st}</label>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Projects List ===== */}
        <div className="col-md-9 bg-white py-4">
          <div className="row">
            {sortedProjects?.length ? (
              sortedProjects.map((project) => (
                <div key={project.id} className="card shadow-sm border mb-3">
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      {project.user?.image ? (
                        <img
                          src={project.user.image}
                          alt={project.user.name}
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
                          {project.user?.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h6 className="fw-semibold mb-0">{project.title}</h6>
                        <small className="text-muted">
                          {project.user?.name}
                        </small>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 text-muted small mb-4">
                      <span>{project.status}</span>
                      <span>•</span>
                      <span>
                        {new Date(
                          project.extra[0]?.created_at
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>لا توجد نتائج</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProjects;
