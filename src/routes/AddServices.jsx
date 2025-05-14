import React from "react";
import WizardStep1 from "../ui/services/WizardStep1";
import WizardStep2 from "../ui/services/WizardStep2";
import WizardStep3 from "../ui/services/WizardStep3";
import useGetSkills from "../hooks/app/useGetSkills";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import useServiceDetails from "../hooks/services/useGetSerciveDetails";
import ErrorPage from "./ErrorPage";
import { ProgressBar } from "react-bootstrap";
import useServiceForm from "../hooks/services/useServiceForm";
import { FormProvider } from "react-hook-form";

const AddServices = () => {
  const { data: skills } = useGetSkills();
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: service, error } = useServiceDetails();

  // Use the custom hook for form management
  const {
    // Form provider
    formProvider,

    // Form state
    step,
    loading,
    progress,
    categoryId,
    setCategoryId,
    selectedOptions,
    isEdit,

    // Navigation
    goToNextStep,
    goToPreviousStep,

    // Skills operations
    handleSkillsChange,
  } = useServiceForm(service, skills);

  if (id && error && !service) {
    return <ErrorPage />;
  }

  return (
    <section className="add-service">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 col-12 p-2">
            <ProgressBar striped animated now={progress} />
            <FormProvider {...formProvider}>
              <form className="form_ui" onSubmit={formProvider.handleSubmit}>
                {step === 1 && (
                  <WizardStep1
                    setStep={goToNextStep}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    skills={skills}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={handleSkillsChange}
                  />
                )}
                {step === 2 && (
                  <WizardStep2
                    setStep={goToNextStep}
                    goToPreviousStep={goToPreviousStep}
                  />
                )}
                {step === 3 && (
                  <WizardStep3
                    setStep={goToPreviousStep}
                    loading={loading}
                    isEdit={isEdit}
                  />
                )}
              </form>
            </FormProvider>
          </div>

          <div className="col-lg-4 col-12 p-2">
            <div className="add_service_adivce">
              <h6>{t("addServiceAdvice")}</h6>
              <p>{t("addServiceAdviceText")}</p>

              <h6>1. {t("serviceTitle")}</h6>
              <p>{t("serviceTitleText")}</p>

              <h6>2. {t("serviceCategory")}</h6>
              <p>{t("serviceCategoryText")}</p>

              <h6>3. {t("servicePrice")}</h6>
              <p>{t("servicePriceText")}</p>

              <h6>4. {t("serviceDays")}</h6>
              <p>{t("serviceDaysText")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddServices;
