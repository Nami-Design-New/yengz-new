import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import DepartmentFilterBox from "../freelancers/DepartmentFilterBox";
import MultiSelect from "../forms/MultiSelect";
import RatingFilterBox from "./RatingFilterBox";
import SellerStatusFilterBox from "./SellerStatusFilterBox";
import useServiceFilters from "../../hooks/services/useServiceFilters";
import useGetSkills from "../../hooks/app/useGetSkills";
import RangeSlider from "../RangeSlider";

const ServiceFilterSidebar = ({
  isFilterOpen,
  setIsFilterOpen,
  type = "service",
}) => {
  const { t } = useTranslation();
  const { data: skills } = useGetSkills();
  const {
    filters,
    selectedOptions,
    handleChange,
    handleSkillSelect,
    handleRangeChange,
    applyFilters,
    clearFilters,
    categoriesWithSubCategories,
  } = useServiceFilters();

  // Use the handleRangeChange function from useServiceFilters hook

  return (
    <aside
      className={`col-lg-3 p-2 mt-2 side-menu ${isFilterOpen ? "active" : ""}`}
    >
      <div className="filter-wrap">
        <div className="colse" onClick={() => setIsFilterOpen(false)}>
          <i className="fa-light fa-xmark"></i>
        </div>
        <form onSubmit={applyFilters}>
          <InputField
            id="aside-search-input"
            name="search"
            value={filters.search}
            onChange={handleChange}
            label={t("search.search")}
            placeholder={t("search.searchFor")}
          />
          <DepartmentFilterBox
            categoriesValue={filters.categories}
            sub_categoriesValue={filters.sub_categories}
            onChange={handleChange}
            categoriesWithSubCategories={categoriesWithSubCategories}
          />
          <hr />
          <MultiSelect
            label={t("search.skills")}
            id="skills"
            name="skills"
            selectedOptions={selectedOptions}
            handleChange={handleSkillSelect}
            options={
              skills?.map((skill) => ({
                label: skill?.name,
                value: skill?.id,
              })) || []
            }
          />
          {type === "service" && (
            <>
              <RatingFilterBox value={filters.rate} onChange={handleChange} />
              <hr />
            </>
          )}
          {type === "service" && (
            <SellerStatusFilterBox
              user_available={filters.user_available}
              user_verification={filters.user_verification}
              onChange={handleChange}
            />
          )}

          {type === "projects" && (
            <>
              {" "}
              <div className="mb-4">
                <h6 className="mb-2">{t("search.deliveryTime")}</h6>
                <RangeSlider
                  min={1}
                  steps={1}
                  max={360}
                  value={[filters.duration_from, filters.duration_to]}
                  handleSlide={(value) => handleRangeChange("duration", value)}
                  minType={t("search.days")}
                  maxType={t("search.days")}
                />
              </div>
              <div className="mb-4">
                <h6 className="mb-2">{t("search.budget")}</h6>
                <RangeSlider
                  min={5}
                  max={2000}
                  steps={5}
                  value={[filters.price_from, filters.price_to]}
                  handleSlide={(value) => handleRangeChange("price", value)}
                  minType="$"
                  maxType="$"
                />
              </div>
            </>
          )}
          <div className="d-flex gap-2">
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

export default ServiceFilterSidebar;
