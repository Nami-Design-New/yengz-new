import React, { useEffect, useState } from "react";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { useTranslation } from "react-i18next";
import useGetCompanyCategory from "../../../hooks/orgs/useGetCompanyCategory";
import DataLoader from "../../DataLoader";
import usePostCreateCompany from "../../../hooks/orgs/usePostCreateCompany";
import { toast } from "sonner";

const CreateEnterpriseForm = ({ type, companyDetailsSimpleData }) => {
  const { t } = useTranslation();

  const { data: companyData, isLoading } = useGetCompanyCategory();
  const { handleCreateCompany } = usePostCreateCompany();

  const [formData, setFormData] = useState({
    name: "",
    company_category_id: "",
    // link: "",
    user_name: "",
    description: "",
    employee_count: "",
    website: "",
  });

  // Pre-fill form if edit
  useEffect(() => {
    if (type === "edit" && companyDetailsSimpleData) {
      setFormData({
        name: companyDetailsSimpleData.name || "",
        company_category_id: companyData.id || "",
        // link: companyDetailsSimpleData.website || "",
        user_name: companyDetailsSimpleData.user_name || "",
        description: companyDetailsSimpleData.description || "",
        employee_count: companyDetailsSimpleData.employee_count || "",
        website: companyDetailsSimpleData.website || "",
      });
    }
  }, [type, companyDetailsSimpleData, companyData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  function onSubmit(formData) {
    console.log(formData);

    handleCreateCompany(
      {
        formData,
      },
      {
        onSuccess: () => {
          toast.success(t("communities.commentAddedSuccessfully"));
          // querClinet.invalidateQueries(["create_company"]);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  }

  if (isLoading) return <DataLoader />;
  if (!isLoading && !companyData) return <ErrorPage />;

  return (
    <form className="create-enterprise-form" onSubmit={handleSubmit}>
      <div className="create-enterprise-form-wrapper">
        <div className="row">
          {/* Name */}
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.name")}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="col-12 col-md-6 p-2">
            <SelectField
              options={companyData?.map((comp) => ({
                name: comp.name,
                value: comp.id,
              }))}
              label={t("enterprise.createenterprise.form.field")}
              value={formData.company_category_id}
              onChange={(e) =>
                handleChange("company_category_id", e.target.value)
              }
            />
          </div>

          {/* Link */}
          {/* <div className="col-12 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.link")}
              value={formData.link}
              onChange={(e) => handleChange("link", e.target.value)}
            />
            <span className="hint">
              {t("enterprise.createenterprise.form.linkHint")}
            </span>
          </div> */}

          {/* user name */}
          <div className="col-12 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.userName")}
              value={formData.user_name}
              onChange={(e) => handleChange("user_name", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="col-12 p-2">
            <label className="d-block mb-2">
              {t("enterprise.createenterprise.form.description")}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="desc-field"
            ></textarea>
          </div>

          {/* Employee Count */}
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.employeeCount")}
              value={formData.employee_count}
              onChange={(e) => handleChange("employee_count", e.target.value)}
            />
          </div>

          {/* Website */}
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.website", "Website")}
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="buttons__wrapper">
        <button
          onClick={() => onSubmit(formData)}
          type="submit"
          className="main-btn create-button"
        >
          {type === "edit" && companyDetailsSimpleData?.update_company
            ? t("enterprise.createenterprise.form.edit")
            : t("enterprise.createenterprise.form.submit")}
        </button>

        {type === "edit" && (
          <button
            type="button"
            onClick={() => console.log("Delete enterprise")}
            className="main-btn delete__button--enterprise"
          >
            <i className="fa-regular fa-trash"></i>
            {t("enterprise.createenterprise.form.delete")}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateEnterpriseForm;
