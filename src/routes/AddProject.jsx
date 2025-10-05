import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGetSkills from "../hooks/app/useGetSkills";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";
import useGetProject from "../hooks/projects/useGetProject";
import SectionHeader from "../ui/SectionHeader";
import { useTranslation } from "react-i18next";
import useProjectForm from "../hooks/projects/useProjectForm";
import ManualProjectForm from "../ui/projectes/ManualProjectForm";
import TemplateProjectForm from "../ui/projectes/TemplateProjectForm";
import MegaMenu from "../ui/projectes/MegaMenu";
import useGetCompanyTeamProjects from "../hooks/orgs/useGetCompanyTeamProjects";
import InputField from "../ui/forms/InputField";
import { Controller } from "react-hook-form";
import SelectField from "../ui/forms/SelectField";

const AddProject = () => {
  const { id } = useParams();
  const { data: projectDetails, isLoading: isProjectLodaing } =
    useGetProject(id);
  const { data: skills } = useGetSkills();
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState([]);
  const { data: categories } = useCategorieListWithSub();
  const [formType, setFormType] = useState(null);
  const [projectEntity, setProjectEntity] = useState("personal"); // "institution" or "personal"

  const {
    methods: {
      register,
      formState: { errors },
      control,
      watch,
      reset,
      setValue,
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
  const { data: companyTeamProjectsData } = useGetCompanyTeamProjects();
  const formData = watch();
  console.log("errors", errors);

  useEffect(() => {
    if (categoryId) {
      setSubCategories(
        categories?.find(
          (category) => Number(category.id) === Number(categoryId)
        )?.sub_categories
      );
    }
  }, [categoryId, categories]);

  useEffect(() => {
    if (projectDetails) {
      setCategoryId(projectDetails?.category?.id || "");
      setSubCategoriesId(projectDetails?.sub_category_id || "");
      // تحديث قائمة التصنيفات الفرعية
      setSubCategories(
        categories?.find(
          (category) =>
            Number(category.id) === Number(projectDetails?.category?.id)
        )?.sub_categories || []
      );
    }
  }, [projectDetails, categories]);

  if (id && !isProjectLodaing && !projectDetails) {
    return null;
  }
  console.log(
    "companyTeamProjectsData",
    companyTeamProjectsData,
    subCategories,
    formType,
    categories,
    subCategoriesId
  );

  return (
    <>
      <SectionHeader />
      <section className="addRequest ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12 p-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800 my-4">
                  {t("addProject.entity")}
                </h3>
                {companyTeamProjectsData && (
                  <div className="d-flex gap-3">
                    <label className="d-flex align-item-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="projectEntity"
                        value="personal"
                        checked={projectEntity === "personal"}
                        onChange={(e) => {
                          setProjectEntity(e.target.value);
                          reset();
                          setCategoryId("");
                          setSubCategories([]);
                          setSubCategoriesId("");
                        }}
                        className="rounded-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        {t("addProject.personal")}
                      </span>
                    </label>
                    <label className=" d-flex align-item-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="projectEntity"
                        value="institution"
                        checked={projectEntity === "institution"}
                        onChange={(e) => {
                          setProjectEntity(e.target.value);
                          reset();
                          setCategoryId("");
                          setSubCategories([]);
                          setSubCategoriesId("");
                        }}
                        className="rounded-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">
                        {t("addProject.organization")}
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
                {projectEntity === "institution" && (
                  <>
                    <div className="d-flex flex-column ">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("addProject.team")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        {...register("company_team_id", {
                          required: projectEntity === "institution",
                        })}
                        className="w-full rounded-3 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {companyTeamProjectsData?.map((el) => (
                          <optgroup key={el.id} label={el.name}>
                            {el.teams.map((team) => (
                              <option key={team.id} value={team.id}>
                                {team.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
              <InputField
                label={t("projects.projectTitle")}
                id="title"
                name="title"
                {...register("title")}
                type="text"
                error={errors.title?.message}
                placeholder={t("writeHere")}
                required
                helperText={t("projects.projectTitleHelper")}
              />
              {/* <Controller
                name="sub_category_id"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("projects.subCategory")}
                    id="sub_category_id"
                    name="sub_category_id"
                    options={subCategories}
                    error={errors.sub_category_id?.message}
                    placeholder={t("selectSubCategory")}
                    required
                    value={subCategoriesId || field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setSubCategoriesId(e.target.value);
                    }}
                    helperText={t("projects.subCategoryHelper")}
                  />
                )}
              /> */}
              {!formType && (
                <>
                  <div className="choose-form-type mt-5">
                    <div
                      className="form-option"
                      onClick={() => setFormType("manual")}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                      <h6>{t("projects.manualEntryTitle")}</h6>
                      <p>{t("projects.manualEntryDesc")}</p>
                    </div>
                    <div
                      className="form-option"
                      onClick={() => setFormType("template")}
                    >
                      <i className="fa-regular fa-file-lines"></i>
                      <h6>{t("projects.templateEntryTitle")}</h6>
                      <p>{t("projects.templateEntryDesc")}</p>
                    </div>
                  </div>
                </>
              )}
              {formType && (
                <div className="">
                  <div
                    className="back-to-select mt-3 d-flex justify-content-end"
                    onClick={() => {
                      setFormType(null);
                      // reset({
                      // title: "",z
                      // sub_category_id: "",
                      // description: "",
                      // price: "",
                      // days: "",
                      // skills: [],
                      // project_files: [],
                      // });
                      setCategoryId("");
                      setSubCategories([]);
                      setSubCategoriesId("");
                    }}
                  >
                    {/* <div className="back-to-select__icon">
                      <i className="fa-solid fa-arrow-right"></i>
                    </div> */}
                    <span className="text-primary">
                      {t("projects.backToFormType")}
                    </span>
                  </div>

                  {formType === "manual" && (
                    <ManualProjectForm
                      t={t}
                      register={register}
                      errors={errors}
                      control={control}
                      skills={skills}
                      selectedOptions={selectedOptions}
                      handleSkillsChange={handleSkillsChange}
                      handleAttachments={handleAttachments}
                      removeFile={removeFile}
                      handleSubmit={handleSubmit}
                      formData={formData}
                      isLoading={isLoading}
                      id={id}
                      categoryId={categoryId}
                      setCategoryId={setCategoryId}
                      subCategories={subCategories}
                      setSubCategories={setSubCategories}
                      categories={categories}
                      subCategoriesId={subCategoriesId}
                      setSubCategoriesId={setSubCategoriesId}
                    />
                  )}

                  {formType === "template" && (
                    <MegaMenu
                      t={t}
                      register={register}
                      errors={errors}
                      control={control}
                      categories={categories}
                      categoryId={categoryId}
                      setCategoryId={setCategoryId}
                      subCategories={subCategories}
                      setSubCategories={setSubCategories}
                      selectedOptions={selectedOptions}
                      handleSkillsChange={handleSkillsChange}
                      handleSubmit={handleSubmit}
                      isLoading={isLoading}
                      id={id}
                      skills={skills}
                      setValue={setValue}
                    />
                  )}
                </div>
              )}
            </div>

            {/* advices */}
            <div className="col-lg-4 col-12 p-2">
              <div className="add_service_adivce">
                <h6>{t("addProjectAdvice")}</h6>
                <p>{t("addProjectAdviceText")}</p>

                <h6>1. {t("projectPlatformGuarantee")}</h6>
                <p>{t("projectPlatformGuaranteeText")}</p>

                <h6>2. {t("projectTips")}</h6>
                <p>{t("projectTipsText1")}</p>
                <p>{t("projectTipsText2")}</p>
                <p>{t("projectTipsText3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProject;
