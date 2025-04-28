import React from "react";
import SectionTitle from "./SectionTitle";
import { useTranslation } from "react-i18next";

const AboutEnterprise = () => {
  const { t } = useTranslation();
  return (
    <section className="about-enterprise" id="about-enterprise">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <SectionTitle title={"enterprise.about.title"} />
            <p>{t("enterprise.about.desc1")}</p>
            <p>{t("enterprise.about.desc2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEnterprise;
