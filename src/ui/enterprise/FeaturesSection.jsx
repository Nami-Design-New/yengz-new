import React from "react";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

// Feature data with translation keys
const featureData = [
  {
    id: 1,
    title: "enterprise.features.projects.title",
    description: "enterprise.features.projects.desc",
    link: "enterprise.features.projects.link",
    image: "images/enterprise/project-management.png"
  },
  {
    id: 2,
    title: "enterprise.features.members.title",
    description: "enterprise.features.members.desc",
    link: "enterprise.features.members.link",
    image: "/images/enterprise/project-management.png"
  },
  {
    id: 3,
    title: "enterprise.features.finances.title",
    description: "enterprise.features.finances.desc",
    link: "enterprise.features.finances.link",
    image: "images/enterprise/project-management.png"
  },
  {
    id: 4,
    title: "enterprise.features.collaboration.title",
    description: "enterprise.features.collaboration.desc",
    link: "enterprise.features.collaboration.link",
    image: "images/enterprise/project-management.png"
  },
  {
    id: 5,
    title: "enterprise.features.reports.title",
    description: "enterprise.features.reports.desc",
    link: "enterprise.features.reports.link",
    image: "images/enterprise/project-management.png"
  }
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="features-enterprise section-padding">
      <div className="container">
        <SectionTitle
          title={"enterprise.features.title"}
          description={"enterprise.features.desc"}
        />
        <div className="features-block">
          {featureData.map((feature) => (
            <div className="row p-90" key={feature.id}>
              <div className="col-12 col-lg-6 p-2">
                <div className="info">
                  <h3>{t(feature.title)}</h3>
                  <p>{t(feature.description)}</p>
                  <Link className="feature-link">
                    {t(feature.link)}
                  </Link>
                </div>
              </div>
              <div className="col-12 col-lg-6 p-2">
                <img
                  className="img-fluid"
                  src={feature.image}
                  alt={t(feature.title)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
