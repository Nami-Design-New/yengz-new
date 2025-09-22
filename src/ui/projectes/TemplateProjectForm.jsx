import React, { useMemo } from "react";
import InputField from "../../ui/forms/InputField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import TextField from "../../ui/forms/TextField";
import MultiSelect from "../../ui/forms/MultiSelect";
import { Controller, useWatch } from "react-hook-form";
import useGetTemplateHelpers from "../../hooks/projects/useGetTemplateHelpers";

const TemplateProjectForm = ({
  t,
  register,
  errors,
  control,
  categories,
  categoryId,
  setCategoryId,
  subCategories,
  setSubCategories,
  selectedOptions,
  handleSkillsChange,
  handleSubmit,
  isLoading,
  id,
  skills,
  helperName,
}) => {
  const subCategoryId = useWatch({ control, name: "sub_category_id" });
  const { data } = useGetTemplateHelpers();

  const matchedHelper = useMemo(() => {
    if (!categoryId || !subCategoryId || !data) return null;

    for (let cat of data) {
      if (Number(cat.id) === Number(categoryId)) {
        const helper = cat.helpers?.find(
          (helperItem) =>
            Number(helperItem.category_id) === Number(categoryId) &&
            Number(helperItem.sub_category_id) === Number(subCategoryId)
        );
        return helper || null;
      }
    }

    return null;
  }, [categoryId, subCategoryId, data]);

  console.log("Matched Helper:", matchedHelper);
  console.log(" Helper:::::::::::", data, helperName);

  const targetHelper = useMemo(() => {
    if (!data || !helperName) return null;

    for (let cat of data) {
      const helper = cat.helpers?.find((h) => h.name === helperName);
      if (helper) {
        return {
          category_id: cat.id,
          sub_category_id: helper.sub_category_id,
          helper,
        };
      }
    }
    return null;
  }, [data, helperName]);

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <InputField
            label={t("projects.projectTitle")}
            id="title"
            name="title"
            {...register("title")}
            type="text"
            error={errors.title?.message}
            placeholder={t("writeHere")}
            required
          />
        </div>

        {/* <div className="col-lg-6 col-12 p-2">
          <SelectField
            label={t("addService.serviceCategory")}
            id="category"
            name="category"
            disabledOption={t("select")}
            value={categoryId}
            onChange={(e) => {
              const selectedCat = categories?.find(
                (category) => Number(category.id) === Number(e.target.value)
              );
              setSubCategories(selectedCat?.sub_categories || []);
              setCategoryId(e.target.value);
            }}
            options={categories?.map((category) => ({
              name: category.name,
              value: category.id,
            }))}
            required
          />
        </div>

        <div className="col-lg-6 col-12 p-2">
          <Controller
            name="sub_category_id"
            control={control}
            render={({ field }) => (
              <SelectField
                label={t("addService.serviceSubCategory")}
                id="sub_category_id"
                name="sub_category_id"
                {...field}
                error={errors.sub_category_id?.message}
                options={subCategories?.map((subCategory) => ({
                  name: subCategory.name,
                  value: subCategory.id,
                }))}
                disabledOption={
                  categoryId ? t("select") : t("addService.selectCategoryFirst")
                }
                required
              />
            )}
          />
        </div> */}
        {/* Category Select */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label={t("addService.serviceCategory")}
            id="category"
            name="category"
            disabledOption={t("select")}
            value={categoryId || targetHelper?.category_id || ""} // ✅ prefer categoryId after first select
            onChange={(e) => {
              const selectedCat = categories?.find(
                (category) => Number(category.id) === Number(e.target.value)
              );
              setSubCategories(selectedCat?.sub_categories || []);
              setCategoryId(e.target.value);
            }}
            options={categories?.map((category) => ({
              name: category.name,
              value: category.id,
            }))}
            required
          />
        </div>

        {/* SubCategory Select */}
        <div className="col-lg-6 col-12 p-2">
          <Controller
            name="sub_category_id"
            control={control}
            render={({ field }) => (
              <SelectField
                label={t("addService.serviceSubCategory")}
                id="sub_category_id"
                {...field}
                value={subCategoryId || targetHelper?.sub_category_id || ""} // ✅ prefer form state
                onChange={(e) => {
                  field.onChange(e.target.value); // ✅ update react-hook-form state
                }}
                options={[
                  ...(subCategories?.map((subCategory) => ({
                    name: subCategory.name,
                    value: subCategory.id,
                  })) || []),
                  ...(targetHelper
                    ? [
                        {
                          name: targetHelper.helper.name,
                          value: targetHelper.sub_category_id,
                        },
                      ]
                    : []),
                ]}
                disabledOption={
                  categoryId ? t("select") : t("addService.selectCategoryFirst")
                }
                required
              />
            )}
          />
        </div>

        {/* {categoryId && subCategoryId && ( */}
        <>
          <div className="col-12 p-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("projects.projectDescription")}
                  placeholder={t("writeHere")}
                  id="description"
                  {...field}
                  error={errors.description?.message}
                />
              )}
            />
          </div>

          <div className="col-lg-6 col-12 p-2">
            <InputField
              label={t("projects.price")}
              id="price"
              name="price"
              {...register("price")}
              type="number"
              span={"$"}
              required
            />
          </div>

          <div className="col-lg-6 col-12 p-2">
            <InputField
              label={t("projects.deliveryTime")}
              placeholder={t("projects.days")}
              id="days"
              name="days"
              type="number"
              {...register("days")}
              error={errors.days?.message}
              span={t("projects.days")}
              required
            />
          </div>
          <div className="col-12 p-2">
            <MultiSelect
              label={t("search.skills")}
              id="skills"
              name="skills"
              selectedOptions={selectedOptions}
              handleChange={handleSkillsChange}
              options={
                matchedHelper?.skills?.length
                  ? matchedHelper.skills.map((skill) => ({
                      label: skill?.name,
                      value: skill?.id,
                    }))
                  : skills?.map((skill) => ({
                      label: skill?.name,
                      value: skill?.id,
                    }))
              }
            />
          </div>

          {matchedHelper?.inputs?.length > 0 &&
            matchedHelper.inputs.map((input) => (
              <div key={input.id} className="col-12 p-2">
                {input.type === "text" && (
                  <InputField
                    label={input.name}
                    id={`dynamic_${input.id}`}
                    name={`dynamic_${input.id}`}
                    placeholder={input.hint || t("writeHere")}
                    {...register(`dynamic_${input.id}`)}
                    type="text"
                  />
                )}

                {input.type === "number" && (
                  <InputField
                    label={input.name}
                    id={`dynamic_${input.id}`}
                    name={`dynamic_${input.id}`}
                    placeholder={input.hint || t("writeHere")}
                    {...register(`dynamic_${input.id}`)}
                    type="number"
                  />
                )}

                {input.type === "textarea" && (
                  <TextField
                    label={input.name}
                    id={`dynamic_${input.id}`}
                    placeholder={input.hint || t("writeHere")}
                    {...register(`dynamic_${input.id}`)}
                  />
                )}
              </div>
            ))}
        </>
        {/* )} */}
      </div>

      <div className="col-12 p-2 d-flex justify-content-end">
        <SubmitButton
          loading={isLoading}
          name={id ? t("projects.update") : t("projects.publish")}
        />
      </div>
    </form>
  );
};

export default TemplateProjectForm;
