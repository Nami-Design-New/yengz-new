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

const AddProject = () => {
  const { id } = useParams();
  const { data: projectDetails, isLoading: isProjectLodaing } = useGetProject();
  const { data: skills } = useGetSkills();
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);
  const { data: categories } = useCategorieListWithSub();
  const [formType, setFormType] = useState(null);

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
    return null;
  }

  return (
    <>
      <SectionHeader />
      <section className="addRequest">
        <div className="container">
          <div className="row justify-content-center">

            {!formType && (
              <div className="col-lg-7 col-12 p-2">
                <div className="choose-form-type">
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
              </div>
            )}

            {formType && (
              <div className="col-lg-7 col-12 p-2">
                <div
                  className="back-to-select mb-3"
                  onClick={() => setFormType(null)}
                >
                  <div className="back-to-select__icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                  <span>{t("projects.backToFormType")}</span>
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
                  />
                )}

                {formType === "template" && (
                  <TemplateProjectForm
                    t={t}
                    register={register}
                    errors={errors}
                    control={control}
                    categories={categories}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    subCategories={subCategories}
                    setSubCategories={setSubCategories}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    id={id}
                  />
                )}
              </div>
            )}

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
