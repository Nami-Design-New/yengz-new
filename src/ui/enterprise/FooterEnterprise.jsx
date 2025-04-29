import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const FooterEnterprise = () => {
  const { t } = useTranslation();
  return (
    <section className="footer-enterprise padding-section">
      <div className="container">
        <div className="text-data">
          <h3>{t("enterprise.footer.title")}</h3>
          <Link className="main-link ">{t("enterprise.hero.link")}</Link>
        </div>
      </div>
    </section>
  );
};

export default FooterEnterprise;
