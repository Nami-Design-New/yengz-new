import React, { useEffect, useState } from "react";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import MultiSelect from "../forms/MultiSelect";
import TextField from "../forms/TextField";
import { useTranslation } from "react-i18next";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";
import { Controller, useFormContext } from "react-hook-form";

const WizardStep1 = ({
  setStep,
  categoryId,
  setCategoryId,
  skills,
  selectedOptions,
  setSelectedOptions,
}) => {
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories } = useCategorieListWithSub();

  // Get form context
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async (e) => {
    e.preventDefault();
    // Trigger validation for all required fields in step 1
    const fieldsToValidate = [
      "title",
      "sub_category_id",
      "description",
      "skills",
    ];
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

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

  return (
    <>
      {/* title */}
      <InputField
        label={t("addService.serviceTitle")}
        placeholder={t("addService.serviceTitlePlaceholder")}
        id="title"
        {...register("title")}
        type="text"
        error={errors.title?.message}
        toolTipContent={t("addService.titleHint")}
        required
      />
      <div className="d-flex align-items-center gap-2 w-100">
        {/* category */}
        <SelectField
          label={t("addService.serviceCategory")}
          id="category"
          name="category"
          disabledOption={t("select")}
          value={categoryId}
          onChange={(e) => {
            setSubCategories(
              categories?.find(
                (category) => Number(category.id) === Number(e.target.value)
              )?.sub_categories
            );
            setCategoryId(e.target.value);
          }}
          options={categories?.map((category) => ({
            name: category.name,
            value: category.id,
          }))}
          required
        />
        {/* sub_category */}
        <Controller
          name="sub_category_id"
          control={control}
          render={({ field }) => (
            <SelectField
              label={t("addService.serviceSubCategory")}
              id="sub_category_id"
              {...field}
              error={errors.sub_category_id?.message}
              options={subCategories?.map((subCategory) => ({
                name: subCategory.name,
                value: subCategory.id,
              }))}
              disabledOption={
                categoryId ? t("select") : t("addService.selectCategoryFirst")
              }
            />
          )}
          required
        />
      </div>

      <div className="col-12 p-2">
        <MultiSelect
          label={t("search.skills")}
          id="skills"
          name="skills"
          selectedOptions={selectedOptions}
          handleChange={setSelectedOptions}
          options={skills?.map((skill) => ({
            label: skill?.name,
            value: skill?.id,
          }))}
          error={errors.skills?.message}
        />
      </div>
      {/* description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            label={t("addService.serviceDescription")}
            placeholder={t("writeHere")}
            id="description"
            {...field}
            error={errors.description?.message}
            toolTipContent={t("addService.serviceDescriptionHint")}
          />
        )}
      />
      <button
        onClick={(e) => handleNext(e)}
        className={`w-25 mt-4 align-self-end`}
      >
        {t("next")}
      </button>
    </>
  );
};

export default WizardStep1;
