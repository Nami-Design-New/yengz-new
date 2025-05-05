import React from "react";
import { useTranslation } from "react-i18next";

const StepCard = ({ card }) => {
  const { t } = useTranslation();
  return (
    <div className="step-card">
      <div className="step-card-content">
        <div className="image-wrapper">
          <img className="img-fluid" src={card.icon} />
        </div>
        <h3>{t(card.title)}</h3>
      </div>
      <p>{t(card.description)}</p>
      <div className="number">{card.number}</div>
    </div>
  );
};

export default StepCard;
