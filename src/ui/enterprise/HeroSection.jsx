import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const HeroSection = () => {
  const { t } = useTranslation();
  const scrollToSection = () => {
    document
      .getElementById("about-enterprise")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="hero-enterprise">
      <div className="container main-container">
        <div className="hero-position">
          <h1 className="title">{t("enterprise.hero.title")}</h1>
          <p className="desc">{t("enterprise.hero.desc")}</p>
          <Link to={"/"} className="main-link create-link">
            {t("enterprise.hero.link")}{" "}
          </Link>
        </div>
        <div className="read-more" onClick={scrollToSection}>
          <h4>{t("enterprise.hero.more")}</h4>
          <img src="/images/enterprise/read-more.svg" alt="read more icon" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
