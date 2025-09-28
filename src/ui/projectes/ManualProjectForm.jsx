import React from "react";
import { Link } from "react-router";
import InputField from "../../ui/forms/InputField";
import TextField from "../../ui/forms/TextField";
import MultiSelect from "../../ui/forms/MultiSelect";
import SubmitButton from "../../ui/forms/SubmitButton";
import SelectField from "../forms/SelectField";
import { Controller } from "react-hook-form";

const ManualProjectForm = ({
  t,
  register,
  errors,
  control,
  skills,
  selectedOptions,
  handleSkillsChange,
  handleAttachments,
  removeFile,
  handleSubmit,
  formData,
  isLoading,
  id,
  categoryId,
  setCategoryId,
  subCategories,
  setSubCategories,
  categories,
  subCategoriesId,
  setSubCategoriesId,
}) => {
  console.log("manual project form categories", {
    categoryId,
    setCategoryId,
    subCategories,
    setSubCategories,
    categories,
    subCategoriesId,
    setSubCategoriesId,
    id,
  });

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        {/* <div className="col-12 p-2">
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
        </div> */}

        {/* Category Select */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label={t("addService.serviceCategory")}
            id="category"
            name="category"
            disabledOption={t("select")}
            value={categoryId || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              setCategoryId(selectedId);

              // فلترة الكاتيجوريز حسب الـ id
              const selectedCat = categories?.find(
                (cat) => Number(cat.id) === Number(selectedId)
              );

              // تحديث الـ helpers في subCategories
              setSubCategories(selectedCat?.sub_categories || []);

              // reset subCategory
              setSubCategoriesId("");
            }}
            options={categories?.map((category) => ({
              name: category.name,
              value: category.id,
            }))}
            required
          />
        </div>

        {/* Helpers Select */}
        <div className="col-lg-6 col-12 p-2">
          <Controller
            name="sub_category_id"
            control={control}
            render={({ field }) => (
              <SelectField
                label={t("addService.serviceSubCategory")}
                id="sub_category_id"
                {...field}
                value={subCategoriesId || ""} // هنا القيمة المختارة فقط
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setSubCategoriesId(e.target.value);
                }}
                options={
                  subCategories?.map((helper) => ({
                    name: helper.name, // اسم الهيلبر يظهر في الـ UI
                    value: helper.id, // قيمة الهيلبر
                  })) || []
                }
                disabledOption={
                  categoryId ? t("select") : t("addService.selectCategoryFirst")
                }
                required
              />
            )}
          />
        </div>

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
            options={skills?.map((skill) => ({
              label: skill?.name,
              value: skill?.id,
            }))}
          />
        </div>

        <div className="col-12 p-2">
          <label className="upload_attachments">
            <div className="icon">
              <img src="/images/img-upload.svg" alt="icon" />
            </div>
            <div className="content">
              <h6>{t("projects.addattachments")}</h6>
            </div>
            <input
              type="file"
              name="project_files"
              id="project_files"
              multiple
              onChange={handleAttachments}
            />
          </label>
        </div>

        {formData?.project_files?.length > 0 && (
          <div className="col-12 p-2">
            <div className="attachments">
              {formData?.project_files?.map((file, index) => (
                <div className="attachment" key={index}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon">
                      <img
                        src={
                          file?.type?.startsWith("image/")
                            ? URL.createObjectURL(file)
                            : "/images/doc.svg"
                        }
                        alt="icon"
                      />
                    </div>
                    <div className="content">
                      <h6>
                        {file?.file ? (
                          <Link target="_blank" to={file?.file}>
                            {file?.file}
                          </Link>
                        ) : (
                          file?.name
                        )}
                      </h6>
                      <p>
                        {file?.file_size
                          ? file?.file_size?.toFixed(2)
                          : (file.size / 1024).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                  </div>
                  <div
                    className="delete"
                    onClick={() => removeFile(index, file)}
                  >
                    <i className="fa-regular fa-trash"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra fields for handleSubmit */}
        <div className="col-lg-4 col-12 p-2">
          <InputField
            label="Name (Arabic)"
            id={`extra[0][name_ar]`}
            name={`extra[0][name_ar]`}
            {...register(`extra[0][name_ar]`)}
            type="text"
            placeholder={t("writeHere")}
            required
          />
        </div>
        <div className="col-lg-4 col-12 p-2">
          <InputField
            label="Name (English)"
            id={`extra[0][name_en]`}
            name={`extra[0][name_en]`}
            {...register(`extra[0][name_en]`)}
            type="text"
            placeholder={t("writeHere")}
            required
          />
        </div>
        <input type="hidden" {...register(`extra[0][value]`)} value="name" />
        <input type="hidden" {...register(`extra[0][type]`)} value="text" />
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

export default ManualProjectForm;
