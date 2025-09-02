import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import InputField from "../forms/InputField";
import { useTranslation } from "react-i18next";
import useGetSettings from "../../hooks/settings/useGetSettings";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";

const WizardStep2 = ({ setStep, goToPreviousStep }) => {
  const { t } = useTranslation();
  const { data: settings } = useGetSettings();

  // Get form context
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
  } = useFormContext();

  // Watch form values
  const formData = watch();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  const handleNext = async (e) => {
    e.preventDefault();
    const fieldsToValidate = ["images", "price", "days"];
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep();
    } else {
      // Force display of validation errors
      fieldsToValidate.forEach((field) => {
        if (errors[field]) {
          console.log(
            `Validation error for ${field}: ${errors[field].message}`
          );
        }
      });
    }
  };

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    const currentImages = getValues("images") || [];
    if (currentImages.length + newImages.length > 10) {
      toast.warning(t("addService.imageLimitReached"));
      return;
    }
    setValue("images", [...currentImages, ...newImages]);
  };

  const handleRemoveImage = (index, image) => {
    const currentImages = getValues("images");
    if (image.id) {
      const currentDeletedImages = getValues("delete_images") || [];
      setValue("delete_images", [...currentDeletedImages, image.id]);
    }
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      {/* images */}
      <div className="input-field">
        <label htmlFor="info-htmlFor-customer">
          <div className="d-flex justify-content-between align-items-center">
            <span>{t("addService.serviceGallery")} <b style={{ color: "red" }}>*</b></span> 
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip({
                content: t("addService.galleryHint"),
              })}
            >
              <i className="info-label fa-light fa-circle-info"></i>
            </OverlayTrigger>
          </div>
          <small>{t("addService.imagesHint")}</small>
        </label>
        <div className="images_grid_upload">
          <div className="file_upload">
            <label htmlFor="file_upload">
              <input
                type="file"
                id="file_upload"
                accept="image/*"
                name="images"
                multiple
                onChange={handleImagesChange}
              />
              <img src={"/images/gallery.svg"} alt="upload" />
            </label>
          </div>
          {formData?.images && (
            <>
              {formData?.images?.map((image, index) => (
                <div className="uploaded_file" key={index}>
                  <img
                    src={
                      image?.type?.startsWith("image/")
                        ? URL.createObjectURL(image)
                        : image?.image
                    }
                    alt="file"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage(index, image);
                    }}
                  >
                    <i className="fa-light fa-xmark"></i>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="d-flex gap-2 w-100">
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputField
              label={t("addService.servicePrice")}
              type="number"
              id="price"
              min={0}
              placeHolder={"00"}
              error={errors.price?.message}
              {...field}
              required
            />
          )}
        />
        <InputField
          label={
            t("addService.yourDuesAfterfees") +
            "  (" +
            settings?.data?.service_percentage +
            "%)"
          }
          type="number"
          id="price_after_fees"
          readOnly
          name="price_after_fees"
          min={0}
          style={{ userSelect: "none" }}
          value={
            (formData.price * (100 - settings?.data?.service_percentage)) / 100
          }
          required
        />
      </div>
      <Controller
        name="days"
        control={control}
        render={({ field }) => (
          <InputField
            label={t("addService.serviceDays")}
            type="number"
            id="days"
            min={0}
            placeHolder={"00"}
            error={errors.days?.message}
            toolTipContent={t("addService.daysHint")}
            {...field}
            required
          />
        )}
      />

      <div className="d-flex justify-content-between mt-4 w-100">
        <button
          className="back_btn"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log("setStep1");
            goToPreviousStep(1);
          }}
        >
          {t("back")}
        </button>
        <button
          onClick={(e) => handleNext(e)}
          className={`w-25 align-self-end`}
        >
          {t("next")}
        </button>
      </div>
    </>
  );
};

export default WizardStep2;
