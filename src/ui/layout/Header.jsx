import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useAuth from "../../hooks/auth/useAuth";
import CategoriesDropDown from "./CategoriesDropDown";
import LanguageMenu from "./LanguageMenu";
import NotificationMenu from "./NotificationMenu";
import SearchMenu from "./SearchMenu";
import SmallMediaMenu from "./SmallMediaMenu";
import UserMenu from "./UserMenu";
import WebMenuSideBar from "./WebMenuSideBar";

export default function Header() {
  const [isSmallMediaMenuOpen, setIsSmallMediaMenuOpen] = useState(false);

  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { user } = useSelector((state) => state.authedUser);
  const [isWebMenuOpen, setIsWebMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <button
          className={`toogler ${isSmallMediaMenuOpen ? "close" : ""}`}
          onClick={() => setIsSmallMediaMenuOpen(() => !isSmallMediaMenuOpen)}
        >
          <i className="fa-regular fa-bars-staggered"></i>
        </button>
        <SmallMediaMenu
          isSmallMediaMenuOpen={isSmallMediaMenuOpen}
          setIsSmallMediaMenuOpen={setIsSmallMediaMenuOpen}
        />

        <div className="right-wrapper">
          <button
            className="webmenu_open"
            onClick={() => setIsWebMenuOpen(!isWebMenuOpen)}
          >
            <i className="fa-regular fa-bars-staggered"></i>
          </button>

          <div className="logo">
            <Link to="/">
              <img className="brand" src="/images/logo.svg" alt="logo" />
            </Link>
          </div>

          <ul className="nav-links">
            <li className="nav-link">
              <Link to="service/add">
                <i className="far fa-plus"></i> {t("navbar.addService")}
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/project/add">
                <i className="far fa-plus"></i> {t("navbar.addProject")}
              </Link>
            </li>

            <CategoriesDropDown />

            {isAuthed && (
              <>
                <li className="nav-link">
                  <Link to="/purchases">
                    <i className="far fa-shopping-bag"></i>{" "}
                    {t("navbar.purchase")}
                  </Link>
                  <span className="num-count2">
                    {user?.service_purchase_count || 0}
                  </span>
                </li>

                <li className="nav-link">
                  <Link to="/recieved-orders">
                    <i className="far fa-clipboard-list-check"></i>{" "}
                    {t("navbar.requestsRecieved")}
                  </Link>
                  <span className="num-count2">
                    {user?.service_orders_count || 0}
                  </span>
                </li>

                <li className="nav-link">
                  <Link to="/projects-orders">
                    <i className="fa-regular fa-hourglass-half"></i>
                    {t("navbar.projectsOrders")}
                  </Link>
                  <span className="num-count2">
                    {user?.projects_order_count || 0}
                  </span>
                </li>
              </>
            )}
          </ul>

          <WebMenuSideBar isOpen={isWebMenuOpen} setIsOpen={setIsWebMenuOpen} />
        </div>

        <div className="left-wrapper">
          <ul className="loged-in-minor-menu">
            <SearchMenu />
            <LanguageMenu />

            {isAuthed && (
              <>
                <li className="link hide-sm2">
                  <Link to="/cart" className="cart btn">
                    <i className="fa-light fa-cart-shopping"></i>
                    <span className="num-count">{user?.cart_count || 0}</span>
                  </Link>
                </li>

                <li className="link hide-sm2">
                  <Link to="/chat" className="cart btn">
                    <i className="fa-regular fa-message-lines"></i>
                    <span className="num-count">{user?.chat_count || 0}</span>
                  </Link>
                </li>

                <NotificationMenu user={user} />
              </>
            )}

            {!isAuthed && (
              <>
                <li className="link hide-sm2">
                  <div className="btns">
                    <Link to="/login">
                      <i className="fa-light fa-arrow-right-to-bracket"></i>{" "}
                      {t("navbar.login")}
                    </Link>

                    <Link to="/register">
                      <i className="fa-light fa-user-plus"></i>{" "}
                      {t("navbar.newAccount")}
                    </Link>
                  </div>
                </li>
              </>
            )}

            {isAuthed && <UserMenu user={user} />}
          </ul>
        </div>
      </nav>
    </header>
  );
}
