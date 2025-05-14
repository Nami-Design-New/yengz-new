import React from "react";
import TextField from "../forms/TextField";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SubmitButton from "../forms/SubmitButton";
import AddMoreDevelopCard from "../cards/AddMoreDevelopCard";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";

const WizardStep3 = ({ setStep, loading, isEdit }) => {
  const { t } = useTranslation();
  
  // Get form context
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useFormContext();
  
  // Watch form values
  const formData = watch();
  
  const developmentInitial = {
    description: "",
    price: "",
    duration: "",
  };

  const handleAddDev = () => {
    const currentDevelopments = getValues("developments") || [];
    setValue("developments", [...currentDevelopments, developmentInitial]);
  };
  
  const handleRemoveDev = (dev, index) => {
    const currentDevelopments = getValues("developments");
    if (dev.id) {
      const currentDeletedDevelopments = getValues("delete_developments") || [];
      setValue("delete_developments", [...currentDeletedDevelopments, dev.id]);
    }
    setValue(
      "developments",
      currentDevelopments.filter((_, i) => i !== index)
    );
  };
  
  const onDevChange = (e, index) => {
    const { name, value } = e.target;
    const currentDevelopments = getValues("developments");
    setValue(
      "developments",
      currentDevelopments.map((dev, i) =>
        i === index ? { ...dev, [name]: value } : dev
      )
    );
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );
  return (
    <>
      {/* instructions for buyer */}
      <Controller
        name="instructions"
        control={control}
        render={({ field }) => (
          <TextField
            label={t("addService.instructions")}
            id="instructions"
            placeholder={t("writeHere")}
            toolTipContent={t("addService.instructionsHint")}
            error={errors.instructions?.message}
            {...field}
          />
        )}
      />

      <div className="w-100">
        {formData?.developments?.map((dev, index) => (
          <AddMoreDevelopCard
            key={index}
            index={index}
            development={dev}
            handleRemoveDev={handleRemoveDev}
            onDevChange={onDevChange}
          />
        ))}
      </div>

      {/* add more development */}
      <div className="input-field">
        <label htmlFor="add-more-devlop">
          <div className="d-flex justify-content-between align-items-center">
            <span>{t("addService.addMoreDevelopment")}</span>
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip({
                content: t("addService.addMoreDevelopmentHint"),
              })}
            >
              <i className="info-label fa-light fa-circle-info"></i>
            </OverlayTrigger>
          </div>
        </label>
        <div className="add-more-devlop" onClick={handleAddDev}>
          {t("addService.addMoreDevelopment")}
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          {t("back")}
        </button>
        <SubmitButton
          name={
            isEdit
              ? t("addService.updateService")
              : t("addService.addAndConfirm")
          }
          className={"w-25 align-self-end"}
          loading={loading}
        />
      </div>
    </>
  );
};

export default WizardStep3;
