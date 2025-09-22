import React from "react";
import { useTranslation } from "react-i18next";
// Prepare metrics data for MetricsBox component

const MetricsBox = ({ companyDetailsData }) => {
  const { t } = useTranslation();
  const metricsData = [
    { label: "enterprise.stats.members", value:companyDetailsData.members_count },
    { label: "enterprise.stats.messages", value: companyDetailsData.chat_count },
    { label: "enterprise.stats.freelancers", value: companyDetailsData.freelance_count },
    { label: "enterprise.stats.monthlyExpenses", value: companyDetailsData.my_spent_month },
  ];

  return (
    <div className="members-messages">
      {metricsData.map((item, index) => (
        <div className="box" key={index}>
          <h4>{t(item.label)}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsBox;
