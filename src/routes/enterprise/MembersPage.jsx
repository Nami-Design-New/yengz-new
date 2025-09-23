import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import useGetCompanyMembers from "../../hooks/orgs/useGetCompanyMembers";

const MembersPage = () => {
  const [sort, setSort] = useState("الأحدث");
  const [search, setSearch] = useState("");
  const [lastLogin, setLastLogin] = useState(0);
  const [verified, setVerified] = useState(0);

  const { link } = useParams();
  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: categoriesListData } = useCategoriesList();
  const { data: companyMembersData } = useGetCompanyMembers(
    link,
    search,
    lastLogin,
    verified
  );

  console.log(
    "categoriesListData000000",
    companyTeamData,
    "00000000",
    categoriesListData,
    companyMembersData
  );

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100" dir="rtl">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>رسائل helpers</h4>
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sort}
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

        {/* ====== البحث ====== */}
        <div className="col-md-3">
          <div className=" p-3">
            <label htmlFor="search">بحث</label>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="form-control my-2"
            />
            <h6 className="my-4">الفريق</h6>
            {companyTeamData?.map((team) => (
              <div className="my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={team.name}
                />
                <label className="form-check-label mx-2" htmlFor={team.name}>
                  {team.name}
                </label>
              </div>
            ))}
            <h6 className="my-4">التخصص</h6>
            {categoriesListData?.map((team) => (
              <div className="my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={team.name}
                />
                <label className="form-check-label mx-2" htmlFor={team.name}>
                  {team.name}
                </label>
              </div>
            ))}
            <label htmlFor="search">المسمى الوظيفي</label>
            <input type="text" className="form-control my-2" />
            <label htmlFor="search">المهارات</label>
            <input type="text" className="form-control my-2" />
            <label htmlFor="search">الدولة</label>
            <input type="text" className="form-control my-2" />

            <h6 className="my-4">الأعضاء</h6>
            <div className="my-2">
              <input
                onClick={(e) => {
                  if (e.target.checked) {
                    setVerified(1);
                  }else{
                    setVerified(0)
                  }
                }}
                className="form-check-input"
                type="checkbox"
                id="person"
              />
              <label className="form-check-label mx-2" htmlFor="person">
                هوية موثّقة
              </label>
            </div>
            <div className="my-2">
              <input
                onClick={(e) => {
                  if (e.target.checked) {
                    setLastLogin(1);
                  }else{
                    setLastLogin(1)
                  }
                }}
                className="form-check-input"
                type="checkbox"
                id="online"
              />
              <label className="form-check-label mx-2" htmlFor="online">
                المتصلون الآن
              </label>
            </div>
          </div>
        </div>

        {/* ====== الرسائل ====== */}
        <div className="col-md-9 bg-white py-4">
          <div>
            {companyMembersData?.map((member) => (
              <div key={member.id} className="card shadow-sm border mb-3 ">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="position-relative">
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
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-0">{member.user.name}</h6>
                        {member.user.role ? (
                          <small className="text-muted">
                            {member.user.role}
                          </small>
                        ) : (
                          <small className="text-muted">
                            لم يكتب نبذة شخصية
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Dropdown */}
                    {/* <div className="dropdown">
                <button
                  className="btn btn-sm btn-light"
                  type="button"
                  onClick={() =>
                    setIsDropdownOpen(
                      isDropdownOpen === member.id ? null : member.id
                    )
                  }
                >
                  <MoreVertical size={16} />
                </button>
                {isDropdownOpen === member.id && (
                  <ul className="dropdown-menu show dropdown-menu-end mt-1">
                    <li>
                      <button
                        className="dropdown-item text-danger d-flex justify-content-between align-items-center"
                        onClick={() =>
                          onSubmitDeleteMember(link, id, member.id)
                        }
                      >
                        إزالة من الفريق
                        <Trash2 size={16} />
                      </button>
                    </li>
                  </ul>
                )}
              </div> */}
                  </div>

                  {/* معلومات إضافية */}
                  <div className="d-flex flex-wrap gap-2 text-muted small mb-4">
                    {member.jobTitle ? (
                      <>
                        <span>•</span>
                        <span>{member.jobTitle}</span>
                      </>
                    ) : (
                      "لم يكتب عنوان وظيفي"
                    )}
                    <span>{member.user.projects_count} مشاريع مفتوحة</span>
                    <span>•</span>
                    <span>{member.user.last_login}</span>
                  </div>

                  {/* التاجات */}
                  <div className="d-flex flex-wrap gap-2 mt-6">
                    {member.user.teams.map((tag, index) => (
                      <span key={index} className="badge bg-primary">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
