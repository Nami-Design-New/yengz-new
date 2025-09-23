import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
// import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
// import useCategoriesList from "../../hooks/categories/useCategoriesList";
import { Star } from "lucide-react";
import useGetCompanyFreelancers from "../../hooks/orgs/useGetCompanyFreelancers";

const FreelancersPage = () => {
  const [search, setSearch] = useState("");

  const [rating, setRating] = useState(0);

  const { link } = useParams();
  // const { data: companyTeamData } = useGetCompanyTeam(link);
  // const { data: categoriesListData } = useCategoriesList();
  const { data: companyFreelancersData } = useGetCompanyFreelancers(
    link,
    search
  );

  console.log("companyFreelancersData=== ", companyFreelancersData);

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100" dir="rtl">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-start align-items-center p-5">
          <h4>ابحث عن مستقلين</h4>
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
            <div className="my-4">
              <label className="form-label d-block ">التقييم</label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28} // حجم النجمة
                    onClick={() => setRating(star)}
                    style={{ cursor: "pointer" }}
                    className={
                      rating >= star ? "text-warning " : "text-secondary"
                    }
                    fill={rating >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <input type="hidden" name="rating" value={rating} />
            </div>
            {/* <h6 className="my-4">الفريق</h6>
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
                  } else {
                    setVerified(0);
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
                  } else {
                    setLastLogin(1);
                  }
                }}
                className="form-check-input"
                type="checkbox"
                id="online"
              />
              <label className="form-check-label mx-2" htmlFor="online">
                المتصلون الآن
              </label>
            </div> */}
          </div>
        </div>

        {/* ====== الرسائل ====== */}
        <div className="col-md-9 bg-white py-4">
          <div>
            {companyFreelancersData?.map((member) => (
              <div key={member.id} className="card shadow-sm border mb-3 ">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="position-relative">
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
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-0">{member.name}</h6>
                        {member.about ? (
                          <small className="text-muted">
                            {member.about}
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
                    {member.category_name ? (
                      <>
                        <span>•</span>
                        <span>{member.category_name}</span>
                      </>
                    ) : (
                      "لم يكتب عنوان وظيفي"
                    )}
                    <span>{member.rate} مشاريع مفتوحة</span>
                    <span>•</span>
                    <span>{member.last_login}</span>
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

export default FreelancersPage;
