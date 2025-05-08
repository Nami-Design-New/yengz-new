import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const MobileNav = () => {
  const { t } = useTranslation();
  return (
    <div className="smallNav">
      <ul>
        <li>
          <Link to="/" className="active">
            <i className="fa-sharp fa-solid fa-house"></i>
            <span>{t("routes.home")}</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="fa-solid fa-user"></i>
            <span>{t("routes.profile")}</span>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fa-sharp fa-solid fa-cart-shopping"></i>
            <span>{t("routes.cart")}</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <i className="fa-sharp fa-solid fa-bell"></i>
            <span>{t("routes.notifications")}</span>
            <span className="num-count2">3</span>
          </Link>
        </li>
        <li>
          <Link to="/recieved-orders">
            <i className="fa-sharp fa-solid fa-cubes"></i>
            <span>{t("routes.requests")}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
