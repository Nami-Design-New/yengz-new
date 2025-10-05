import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useCategoriesList from "../../hooks/categories/useCategoriesList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGetCompanyPayments from "../../hooks/orgs/useGetCompanyPayments";
import { useTranslation } from "react-i18next";

const PaymentsPage = () => {
  const { t } = useTranslation();
  const { link } = useParams();

  // ✅ حالات الفلاتر
  const [operations, setOperations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [companyTeamIds, setCompanyTeamIds] = useState([]);

  // ✅ جلب الداتا من الهوكس
  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: categoriesListData } = useCategoriesList();

  const {
    data: companyPaymentsData,
    isLoading,
    error,
  } = useGetCompanyPayments({
    user_name: link,
    operations,
    company_team_ids: companyTeamIds,
    from_date: startDate ? startDate.toISOString().split("T")[0] : undefined,
    to_date: endDate ? endDate.toISOString().split("T")[0] : undefined,
    job_title: jobTitle,
    skills: skills ? skills.split(",") : [],
    categories: selectedCategories,
    country_id: country,
  });

  // ✅ تغيير العمليات
  const handleOperationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setOperations((prev) => [...prev, value]);
    } else {
      setOperations((prev) => prev.filter((op) => op !== value));
    }
  };

  // ✅ تغيير التخصصات
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value));
    }
  };
  console.log("companyPaymentsData==============", companyPaymentsData);

  return (
    <div className="container-fluid bg-color-f0f0f0 min-vh-100">
      <div className="row max-width-5xl mx-auto">
        <div className="d-flex justify-content-between align-items-center p-5">
          <h4>{t("payments.title")}</h4>
          {/* <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              شحن رصيد
            </button>
          </div> */}
        </div>

        {/* ====== الفلاتر ====== */}
        <div className="col-md-3">
          <div className="p-3">
            <h6 className="my-4">{t("payments.team")}</h6>
            <div className="d-flex gap-2 align-items-center my-3">
              <div>
                <label className="form-label">{t("payments.from")}</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy/MM/dd"
                  className="form-control"
                  placeholderText={t("payments.from")}
                />
              </div>
              <div>
                <label className="form-label">{t("payments.to")}</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy/MM/dd"
                  className="form-control"
                  placeholderText={t("payments.to")}
                />
              </div>
            </div>

            {/* التخصص */}
            <h6 className="my-4">{t("payments.categories")}</h6>
            {categoriesListData?.map((cat) => (
              <div className="my-2" key={cat.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  value={cat.id}
                  onChange={handleCategoryChange}
                />
                <label
                  className="form-check-label mx-2"
                  htmlFor={`cat-${cat.id}`}
                >
                  {cat.name}
                </label>
              </div>
            ))}

            {/* المسمى الوظيفي */}
            <label className="mt-3"> {t("payments.jobTitle")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            {/* المهارات */}
            <label> {t("payments.skills")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            {/* الدولة */}
            <label>{t("payments.country")}</label>
            <input
              type="text"
              className="form-control my-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            {/* العمليات */}
            <h6 className="my-4">{t("payments.operations")}</h6>
            {[
              t("payments.operationTypes.project_accept"),
              t("payments.operationTypes.refund_project"),
              t("payments.operationTypes.project_complete"),
            ].map((op) => (
              <div className="my-2" key={op}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={op}
                  value={op}
                  onChange={handleOperationChange}
                />
                <label className="form-check-label mx-2" htmlFor={op}>
                  {op}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ====== النتائج ====== */}
        <div className="col-md-9 bg-white py-4">
          {isLoading && <p className="text-muted h-50 d-flex align-items-center justify-content-center">{t("payments.loading")}</p>}
          {error && (
            <p className="text-danger">
              {t("payments.error")} : {error.message}
            </p>
          )}
          {companyPaymentsData?.map((payment) => (
            <div key={payment.id} className="card shadow-sm border mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-semibold mb-0">
                      {t("payments.operation")}: {payment.operation}
                    </h6>
                    <small className="text-muted">
                      {t("payments.amount")}: {payment.amount}$
                    </small>
                  </div>
                  <span className="text-muted small">{payment.created_at}</span>
                </div>

                {payment.project && (
                  <div className="mt-2">
                    <strong>{t("payments.project")}:</strong>{" "}
                    {payment.project.title}
                  </div>
                )}
              </div>
            </div>
          ))}
          {!isLoading && companyPaymentsData?.length === 0 && (
            <p className="text-muted py-5 d-flex align-items-center justify-content-center">{t("payments.noResults")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
