import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
// Prepare metrics data for MetricsBox component

const MetricsBox = ({ companyDetailsData }) => {
  const { t } = useTranslation();
  const metricsData = [
    {
      label: "enterprise.stats.messages",
      value: companyDetailsData.chat_count,
      link: "messages",
    },
    {
      label: "enterprise.stats.members",
      value: companyDetailsData.members_count,
      link: "members",
    },
    {
      label: "enterprise.stats.freelancers",
      value: companyDetailsData.freelance_count,
      link: "freelancers",
    },
    {
      label: "enterprise.stats.monthlyExpenses",
      value: companyDetailsData.my_spent_month,
      link: "payments",
    },
  ];

  return (
    <div className="members-messages">
      {metricsData.map((item, index) => (
        <Link to={`${item.link}`} className="box" key={index}>
          {console.log(item)}
          <h4>{t(item.label)}</h4>
          <p className="text-black fs-3">{item.value}</p>
        </Link>
      ))}
    </div>
  );
};

export default MetricsBox;
