import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import DepartmentFilterBox from "./DepartmentFilterBox";
import MultiSelect from "../forms/MultiSelect";
import useFreelancerFilters from "../../hooks/freeLancers/useFreelancerFilters.js";
import useGetSkills from "../../hooks/app/useGetSkills";

/**
 * FilterSidebar component - responsible for rendering the filter UI
 * This component handles its own filter state management
 */
const FilterSidebar = ({ isFilterOpen, setIsFilterOpen }) => {
  const { t } = useTranslation();

  // Custom hook for filter logic - moved here from parent component
  const {
    filters,
    selectedSkillOptions,
    handleChange,
    handleSkillSelect,
    handleRatingChange,
    applyFilters,
    clearFilters,
  } = useFreelancerFilters();

  // Get skills data directly in this component
  const { data: skills } = useGetSkills();

  return (
    <aside
      className={`col-lg-3 p-2 pt-3 side-menu ${isFilterOpen ? "active" : ""}`}
    >
      <div className="filter-wrap">
        <div className="colse" onClick={() => setIsFilterOpen(false)}>
          <i className="fa-light fa-xmark"></i>
        </div>
        <form className="form" onSubmit={(e) => applyFilters(e)}>
          <InputField
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            label={t("search.search")}
            placeholder={t("search.searchFor")}
          />
          <DepartmentFilterBox
            categoriesValue={filters.categories}
            onChange={handleChange}
          />
          <InputField
            id="job_title"
            name="job_title"
            value={filters.job_title}
            onChange={handleChange}
            label={t("search.jobTitle")}
            placeholder={t("search.jobTitle")}
          />
          <MultiSelect
            label={t("search.skills")}
            id="skills"
            name="skills"
            options={skills?.map((skill) => ({
              value: skill?.id,
              label: skill?.name,
            }))}
            selectedOptions={selectedSkillOptions}
            handleChange={handleSkillSelect}
          />
          <div className="input-field">
            <label htmlFor="rate">{t("search.rating")}</label>
            <div className="stars">
              <div className="star-rating-service">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`star${star}`}
                      name="rating"
                      value={star}
                      checked={filters.rate === star}
                      onChange={() => handleRatingChange(star)}
                    />
                    <label
                      htmlFor={`star${star}`}
                      title={`${star} stars`}
                      className={filters.rate >= star ? "active" : ""}
                    >
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <ul className="seller-level w-100">
            <h6>{t("search.sellerStatus")}</h6>
            <ul>
              <li>
                <input
                  type="checkbox"
                  id="verified"
                  name="verified"
                  checked={filters.verified === 1}
                  onChange={handleChange}
                />
                <label htmlFor="verified">{t("search.verificated")}</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="last_login"
                  name="last_login"
                  checked={filters.last_login === 1}
                  onChange={handleChange}
                />
                <label htmlFor="last_login">{t("search.onlineNow")}</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="add_request_in_my_projects"
                  name="add_request_in_my_projects"
                  checked={filters.add_request_in_my_projects === 1}
                  onChange={handleChange}
                />
                <label htmlFor="add_request_in_my_projects">
                  {t("search.addedOffers")}
                </label>
              </li>
            </ul>
          </ul>
          <div className="d-flex gap-2 w-100">
            <div className="search-btn">
              <button type="submit">{t("search.apply")}</button>
            </div>
            <div className="search-btn">
              <button type="button" onClick={clearFilters}>
                {t("search.clear")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default FilterSidebar;
