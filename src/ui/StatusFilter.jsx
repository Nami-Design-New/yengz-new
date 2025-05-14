import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { FILTER_STATUS } from "../utils/constants";

function StatusFilter({ isFilterOpen, setIsFilterOpen }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";
  const page = Number(searchParams.get("page"));

  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.append("page", 1);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  function handleApplyFilters() {
    searchFilterData.filter((filter) => filter !== "all").join("-");
    if (searchFilterData.length > 0) {
      if (searchFilterData.includes("all")) {
        searchParams.delete("status");
      } else {
        searchParams.set(
          "status",
          searchFilterData.filter((filter) => filter !== "all").join("-")
        );
      }
      setSearchParams(searchParams);
    } else {
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
  }

  const handleCheckboxChange = (e) => {
    setSearchFilterData((prevState) => {
      if (e.target.value === "all") {
        if (e.target.checked) {
          return FILTER_STATUS;
        } else {
          return [];
        }
      } else {
        const updatedStatuses = e.target.checked
          ? [...prevState, e.target.value]
          : prevState.filter((status) => status !== e.target.value);

        const allStatuses = FILTER_STATUS.filter((status) => status !== "all");
        const areAllStatusesChecked = allStatuses.every((status) =>
          updatedStatuses.includes(status)
        );

        if (areAllStatusesChecked) {
          return ["all", ...updatedStatuses];
        } else {
          return updatedStatuses.filter((status) => status !== "all");
        }
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  return (
    <div
      className={`filter p-2 pt-3 side-menu ${isFilterOpen ? "active" : ""}`}
    >
      <div className="d-flex justify-content-between">
        <h6>{t("status.orderStatus")}</h6>
        <div className="colse" onClick={() => setIsFilterOpen(false)}>
          <i className="fa-light fa-xmark"></i>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <ul className="order-status">
          {FILTER_STATUS.map((status) => (
            <li key={status}>
              <input
                type="checkbox"
                id={status}
                name="order-filter"
                value={status}
                checked={searchFilterData.includes(status)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={status}>{t(`status.${status}`)}</label>
            </li>
          ))}
          <div className="row">
            <div className="search-btn p-0" onClick={handleApplyFilters}>
              <button>{t("search.apply")}</button>
            </div>
          </div>
        </ul>
      </form>
    </div>
  );
}

export default StatusFilter;
