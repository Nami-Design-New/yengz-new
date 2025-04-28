import React from "react";
import { useTranslation } from "react-i18next";

const SectionTitle = ({ title, description }) => {
  const { t } = useTranslation();
  return (
    <div className="section-title">
      <h2>{t(title)}</h2>
      {description && <p>{t(description)}</p>}
    </div>
  );
};

export default SectionTitle;
