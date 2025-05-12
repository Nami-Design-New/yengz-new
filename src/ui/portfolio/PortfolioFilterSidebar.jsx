import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import MultiSelect from "../forms/MultiSelect";
import SelectField from "../forms/SelectField";
import useGetSkills from "../../hooks/app/useGetSkills";
import usePortfolioFilters from "../../hooks/portfolio/usePortfolioFilters";

/**
 * PortfolioFilterSidebar component - responsible for rendering the portfolio filter UI
 * Follows the same pattern as FilterSidebar for consistency
 */
const PortfolioFilterSidebar = ({ isFilterOpen, setIsFilterOpen }) => {
  const { t } = useTranslation();
  const { data: skills } = useGetSkills();
  // Custom hook for filter logic - extracted from component
  const {
    filters,
    selectedOptions,
    handleChange,
    handleSkillSelect,
    applyFilters,
    clearFilters,
  } = usePortfolioFilters();
  return (
    <aside
      className={`col-lg-3 p-2 pt-3 side-menu ${isFilterOpen ? "active" : ""}`}
    >
      <div className="filter-wrap">
        <div className="colse" onClick={() => setIsFilterOpen(false)}>
          <i className="fa-light fa-xmark"></i>
        </div>
        <form className="form" onSubmit={applyFilters}>
          <InputField
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            label={t("search.search")}
            placeholder={t("search.searchFor")}
          />
          <MultiSelect
            label={t("search.skills")}
            id="skills"
            name="skills"
            selectedOptions={selectedOptions}
            handleChange={handleSkillSelect}
            options={skills?.map((skill) => ({
              label: skill?.name,
              value: skill?.id,
            }))}
          />
          <SelectField
            id="duration"
            name="duration"
            onChange={handleChange}
            disabledOption={t("select")}
            value={filters.duration}
            label={t("search.addedDuring")}
            options={[
              { name: t("search.month"), value: 1 },
              { name: t("search.3months"), value: 3 },
              { name: t("search.6months"), value: 6 },
              { name: t("search.year"), value: 12 },
              { name: t("search.all"), value: "" },
            ]}
          />
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

export default PortfolioFilterSidebar;
