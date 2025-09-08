import React from "react";
import PageHeader from "../../ui/enterprise/createEnterprise/PageHeader";
import { useTranslation } from "react-i18next";
import AddButton from "../../ui/enterprise/AddButton ";
import { Link } from "react-router";
import EnterpriseCard from "../../ui/cards/EnterpriseCard";

const Orgs = () => {
  const { t } = useTranslation();
  return (
    <section className="enterprise-layout p-90  orgs">
      <div className="container">
        <div className="header-container">
          <PageHeader showHome={true} />
          <Link className="create-enterprise" to="/enterprise/create">
            <i className="fa-regular fa-plus "></i>
            {t("enterprise.hero.link")}
          </Link>
        </div>
        <div className="row gy-3">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div className="col-12" key={index}>
                <EnterpriseCard />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Orgs;
