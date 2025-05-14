import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";

const AddMoreDevelopCard = ({
  handleRemoveDev,
  index,
  development,
  onDevChange
}) => {
  const { t } = useTranslation();
  return (
    <div id="0" className="add-more-model">
      <div
        className="delete-model"
        onClick={() => handleRemoveDev(development, index)}
      >
        <i className="fa-light fa-circle-xmark" data-card-id="0"></i>
      </div>
      <div className="d-flex flex-column gap-2">
        <InputField
          id={`description-${index}`}
          name="description"
          placeholder={t("addService.moreDevtitlePlaceholder")}
          value={development.description}
          onChange={(e) => onDevChange(e, index)}
        />
        <div className="d-flex gap-2">
          <InputField
            id={`price-${index}`}
            name="price"
            type="number"
            min={0}
            label={t("addService.price")}
            placeholder={t("addService.moreDevPricePlaceholder")}
            value={development.price}
            onChange={(e) => onDevChange(e, index)}
          />
          <InputField
            id={`duration-${index}`}
            name="duration"
            type="number"
            min={0}
            label={t("addService.duration")}
            placeholder={t("addService.moreDevDurationPlaceholder")}
            value={development.duration}
            onChange={(e) => onDevChange(e, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddMoreDevelopCard;
