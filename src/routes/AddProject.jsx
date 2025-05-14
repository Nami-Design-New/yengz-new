import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useGetSkills from "../hooks/app/useGetSkills";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";
import useGetProject from "../hooks/projects/useGetProject";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/forms/InputField";
import MultiSelect from "../ui/forms/MultiSelect";
import SelectField from "../ui/forms/SelectField";
import SubmitButton from "../ui/forms/SubmitButton";
import TextField from "../ui/forms/TextField";
import { useTranslation } from "react-i18next";
import useProjectForm from "../hooks/projects/useProjectForm";
import { Controller } from "react-hook-form";

const AddProject = () => {
  const { id } = useParams();
  const { data: projectDetails, isLoading: isProjectLodaing } = useGetProject();
  const { data: skills } = useGetSkills();
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories } = useCategorieListWithSub();

  const {
    methods: {
      register,
      formState: { errors },
      control,
      watch,
    },
    categoryId,
    selectedOptions,
    handleAttachments,
    handleSkillsChange,
    handleSubmit,
    isLoading,
    removeFile,
    setCategoryId,
  } = useProjectForm(projectDetails, skills);
  const formData = watch();

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

  if (id && !isProjectLodaing && !projectDetails) {
    return <ErrorPage />;
  }

  return (
    <>
      <SectionHeader />
      <section className="addRequest">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12 p-2">
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
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label={t("projects.deliveryTime")}
                      id="days"
                      name="days"
                      type="number"
                      {...register("days")}
                      error={errors.days?.message}
                      span={t("projects.days")}
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <SelectField
                      label={t("addService.serviceCategory")}
                      id="category"
                      name="category"
                      disabledOption={t("select")}
                      value={categoryId}
                      onChange={(e) => {
                        setSubCategories(
                          categories?.find(
                            (category) =>
                              Number(category.id) === Number(e.target.value)
                          )?.sub_categories
                        );
                        setCategoryId(e.target.value);
                      }}
                      options={categories?.map((category) => ({
                        name: category.name,
                        value: category.id,
                      }))}
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
                            categoryId
                              ? t("select")
                              : t("addService.selectCategoryFirst")
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 p-2">
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => {
                        console.log(field);

                        return (
                          <TextField
                            label={t("projects.projectDescription")}
                            placeholder={t("writeHere")}
                            id="description"
                            {...field}
                            error={errors.description?.message}
                          />
                        );
                      }}
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
                </div>
                <div className="col-12 p-2 d-flex justify-content-end">
                  <SubmitButton
                    loading={isLoading}
                    name={id ? t("projects.update") : t("projects.publish")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProject;
