import React from "react";
import { useTranslation } from "react-i18next";

/**
 * FilterToggleButton - A component to toggle the filter sidebar visibility on mobile devices
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isFilterOpen - Current state of filter sidebar visibility
 * @param {Function} props.setIsFilterOpen - Function to toggle filter sidebar visibility
 * @returns {JSX.Element} - Rendered component
 */
const FilterToggleButton = ({ isFilterOpen, setIsFilterOpen, title }) => {
  const { t } = useTranslation();

  return (
    <div className="small-filter-header" aria-label={t("search.toggleFilters")}>
      <h6>{title}</h6>
      <button
        className="openfilter"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <i className="fa-light fa-sliders"></i>
      </button>
    </div>
  );
};

export default FilterToggleButton;
