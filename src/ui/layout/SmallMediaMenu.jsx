import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useGetAbout from "../../hooks/About/useGetAbout";
import useLogout from "../../hooks/auth/useLogout";
import DeleteAcountModal from "../modals/DeleteAcountModal";
import useGetCommunitiesList from "../../hooks/community/useGetCommunitiesList";

function SmallMediaMenu({ isSmallMediaMenuOpen, setIsSmallMediaMenuOpen }) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const { data: footerCategoriesList } = useGetAbout();
  const { data: communities } = useGetCommunitiesList();
  const { logout, isPending } = useLogout();
  function closeSmallMediaMenu() {
    setIsSmallMediaMenuOpen(false);
  }

  return (
    <div className={`small-media-menu  ${isSmallMediaMenuOpen ? "show" : ""}`}>
      {user && (
        <div className="user" onClick={closeSmallMediaMenu}>
          <Link to="/profile" className="avatar">
            <img src={user?.image || "/icons/avatar.jpg"} alt="" />
          </Link>
          <div className="userr">
            <h6>{user?.name}</h6>
          </div>
        </div>
      )}
      <ul className="nav-links">
        <li className="nav-link" onClick={closeSmallMediaMenu}>
          <Link to="/">
            <i className="fa-sharp fa-regular fa-house"></i>
            {t("routes.home")}
          </Link>
        </li>
        <li className="nav-link" onClick={closeSmallMediaMenu}>
          <Link to="/categories">
            <i className="far fa-cube"></i> {t("navbar.categories")}
          </Link>
        </li>
        <li className="nav-link" onClick={closeSmallMediaMenu}>
          <Link to="/freelancers">
            <i className="fa-solid fa-stars"></i> {t("navbar.freelancers")}
          </Link>
        </li>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="nav-link">
              <i className="fa-regular fa-folder"></i>
              <span>{t("navbar.ynjez")}</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {footerCategoriesList?.map((category) => (
                  <li key={category.id} className="nav-link">
                    <Link to={`/about/${category.id}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          {communities && communities?.length > 0 && (
            <Accordion.Item eventKey="1">
              <Accordion.Header className="nav-link">
                <i className="fa-regular fa-comments"></i>{" "}
                <span>{t("navbar.communities")}</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  {communities?.map((community) => (
                    <li key={community.id} className="nav-link">
                      <Link to={`/community/${community.name}`}>
                        {community.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
        {!user && (
          <li className="nav-link" onClick={closeSmallMediaMenu}>
            <Link to="/login">
              <i className="fa-regular fa-arrow-right-from-bracket"></i>
              {t("navbar.login")}
            </Link>
          </li>
        )}
        {user && (
          <>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/recieved-orders">
                <i className="far fa-clipboard-list-check"></i>{" "}
                {t("navbar.requestsRecieved")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/add-service">
                <i className="far fa-plus bigger"></i> {t("navbar.addService")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/add-project">
                <i className="far fa-plus bigger"></i> {t("navbar.addProject")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/profile">
                <i className="fa-regular fa-user"></i>
                {t("navbar.myProfile")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/chat">
                <i className="fa-regular fa-messages"></i>
                {t("navbar.messages")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/cart">
                <i className="fa-light fa-cart-shopping"></i>
                {t("navbar.cart")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/purchases">
                <i className="far fa-shopping-bag"></i> {t("navbar.purchase")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/projects">
                <i className="fa-regular fa-file-invoice"></i>
                {t("navbar.projects")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/projects-orders">
                <i className="fa-regular fa-hourglass-half"></i>
                {t("navbar.projectsOrders")}
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/edit-profile">
                <i className="fa-sharp fa-solid fa-pen-to-square"></i>
                {t("navbar.editProfile")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <Link to="/manage-accounts">
                <i className="fa-sharp fa-regular fa-building-columns"></i>
                {t("navbar.manageAccounts")}
              </Link>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <button onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-trash"></i>
                {t("navbar.deleteAccount")}
              </button>
            </li>
            <li className="nav-link" onClick={closeSmallMediaMenu}>
              <button disabled={isPending} onClick={() => logout()}>
                <i className="fa-regular fa-right-from-bracket"></i>
                {t("navbar.logout")}
              </button>
            </li>
          </>
        )}
      </ul>
      <DeleteAcountModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default SmallMediaMenu;
