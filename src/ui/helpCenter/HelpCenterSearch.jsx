import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGetSearchResult from "../../hooks/help/useGetSearchResult";

const HelpCenterSearch = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useGetSearchResult(submittedSearch);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSubmittedSearch(search.trim());
    setIsMenuOpen(true); // افتح المنيو بعد البحث
  };

  const handleClickResult = (slug) => {
    navigate(`/help-center/details/${slug}`);
    setIsMenuOpen(false); // قفل المنيو بعد اختيار عنصر
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="help-center-searchbar position-relative">
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder={t("help.searchPlaceholder", "ابحث في مركز المساعدة...")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-link">
          <i className="fa fa-search"></i>
        </button>
      </form>

      {/* Dropdown results */}
      {isMenuOpen && submittedSearch && (
        <div className="search-results-dropdown position-absolute bg-white border rounded w-100 mt-1 shadow-sm">
          {/* Header with close btn */}
          <div className="d-flex justify-content-between align-items-center border-bottom p-2">
            <strong>{t("help.searchResults", "نتائج البحث")}</strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseMenu}
            ></button>
          </div>

          {isLoading ? (
            <div className="p-2">{t("loading", "جارٍ التحميل...")}</div>
          ) : data && data.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {data.map((item) => (
                <li
                  key={item.id}
                  className="p-2 border-bottom search-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickResult(item.slug)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2">{t("noResults", "لا توجد نتائج")}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HelpCenterSearch;
