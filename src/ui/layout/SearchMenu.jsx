import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SearchMenu() {
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleToggleSearchInput = () => {
    setIsSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <li className="link" onClick={handleToggleSearchInput}>
        <i
          className="fa-regular fa-magnifying-glass"
          style={{ cursor: "pointer" }}
        ></i>
      </li>

      {isSearchOpen && (
        <form
          action="/services"
          aria-labelledby="searchForm"
          className="nav-search"
          ref={searchRef}
        >
          <input
            className="search_input"
            type="text"
            name="s"
            placeholder={t("navbar.searchFor")}
          />
          <button type="submit">
            <i className="fa-sharp fa-regular fa-magnifying-glass"></i>
          </button>
        </form>
      )}
    </>
  );
}
