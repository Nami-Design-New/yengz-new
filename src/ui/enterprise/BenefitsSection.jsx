import React from "react";
import { useTranslation } from "react-i18next";
import List from "./List";

const BenefitsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="benfits-enterprise section-padding">
      <div className="container main-container">
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <h2> {t("enterprise.benefits.title")}</h2>
            <List />
          </div>
          <div className="col-12 col-md-6 p-2">
            <div className="ratio ratio-16x9">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/M4glLwqDEBw?si=BxMWHxn_A9oC1Ano"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
