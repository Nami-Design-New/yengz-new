import React from "react";
import { useTranslation } from "react-i18next";

const MetricsBox = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="members-messages">
      {items.map((item, index) => (
        <div className="box" key={index}>
          <h4>{t(item.label)}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsBox;
