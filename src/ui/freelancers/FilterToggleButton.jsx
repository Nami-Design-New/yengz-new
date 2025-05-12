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
const FilterToggleButton = ({ isFilterOpen, setIsFilterOpen }) => {
  const { t } = useTranslation();

  return (
    <button
      className="filter-toggle-btn"
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      aria-label={t("search.toggleFilters")}
    >
      <i className="fa-light fa-filter"></i>
      <span>{t("search.filters")}</span>
    </button>
  );
};

export default FilterToggleButton;
