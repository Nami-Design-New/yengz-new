import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const SectionHeader = ({ title }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  return (
    <div className="section-head">
      <div className="container">
        <div className={`row `}>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="text-wrap" data-aos="fade-up">
              <Link to="/">{t("routes.home")}</Link>
              <span>/</span>
              <h6 className="m-0">
                {t(`routes.${location.pathname.split("/")[1]}`)}
              </h6>
            </div>
            <h1>{title}</h1>
          </div>
          <div className="col-6 hide-sm">
            <div className="img" data-aos="zoom-in">
              <img
                src="/images/about7.webp"
                alt=""
                style={{
                  left: lang === "en" ? "unset" : "0",
                  right: lang === "en" ? "0" : "unset",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
