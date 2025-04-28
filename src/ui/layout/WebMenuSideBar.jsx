import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/auth/useAuth";
import SearchPath from "../modals/SearchPath";
import useGetAbout from "../../hooks/About/useGetAbout";
import useGetCommunitiesList from "../../hooks/community/useGetCommunitiesList";

function WebMenuSideBar({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { lang } = useSelector((state) => state.language);

  const { data: footerCategoriesList } = useGetAbout();
  const { data: communities } = useGetCommunitiesList();

  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const menuButton = document.querySelector(".webmenu_open");
    const menu = document.querySelector(".web-menu-sidebar");
    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !menu.contains(e.target)) {
        setIsOpen(false);
      }
    });
  }, [setIsOpen]);

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmitSearch(e) {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className={`layer ${isOpen ? "show" : ""}`}></div>
      <div
        className={`web-menu-sidebar ${isOpen ? "active" : ""} ${
          lang === "en" ? "en" : ""
        }`}
      >
        <form onSubmit={handleSubmitSearch}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder={t("home.searchPlaceHolder")}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>

        <ul className="nav_side_menu">
          <li className="nav-link" onClick={() => setIsOpen(false)}>
            <Link to="/categories">
              <i className="far fa-cube"></i> {t("navbar.categories")}
            </Link>
          </li>

          <li className="nav-link">
            <Link to="/services" onClick={() => setIsOpen(false)}>
              <i className="fa-light fa-database"></i>
              {t("navbar.services")}
            </Link>
          </li>

          <li className="nav-link">
            <Link to="/projects" onClick={() => setIsOpen(false)}>
              <i className="fa-regular fa-file-invoice"></i>
              {t("navbar.projects")}
            </Link>
          </li>

          <li>
            <Link to="/portfolios" onClick={() => setIsOpen(false)}>
              <i className="fa-light fa-briefcase"></i> {t("navbar.portfolios")}
            </Link>
          </li>
          <li>
            <Link to="/freelancers" onClick={() => setIsOpen(false)}>
              <i className="fa-light fa-users"></i> {t("navbar.freelancers")}
            </Link>
          </li>

          {isAuthed && (
            <li>
              <Link to="/bids" onClick={() => setIsOpen(false)}>
                <i className="fa-light fa-envelope"></i> {t("navbar.bids")}
              </Link>
            </li>
          )}

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="fa-light fa-file"></i>
                <span>{t("navbar.ynjez")}</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  {footerCategoriesList?.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/about/${category.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            {communities && communities?.length > 0 && (
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <i className="fa-regular fa-comments"></i>{" "}
                  <span>{t("navbar.communities")}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {communities?.map((community) => (
                      <li key={community.id}>
                        <Link
                          to={`/community/${community.name}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {community.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>

          <li>
            <Link to="/blogs" onClick={() => setIsOpen(false)}>
              <i className="fa-regular fa-blog"></i> {t("navbar.blogs")}
            </Link>
          </li>
        </ul>

        <SearchPath
          searchValue={searchValue}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
}

export default WebMenuSideBar;
