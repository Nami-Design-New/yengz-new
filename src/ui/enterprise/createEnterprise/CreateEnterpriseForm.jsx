import React, { useEffect, useState } from "react";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { useTranslation } from "react-i18next";
import useGetCompanyCategory from "../../../hooks/orgs/useGetCompanyCategory";
import DataLoader from "../../DataLoader";
import usePostCreateCompany from "../../../hooks/orgs/usePostCreateCompany";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import useDeleteCompany from "../../../hooks/orgs/useDeleteCompany";
import { useQueryClient } from "@tanstack/react-query";
import usePostUpdateCompany from "../../../hooks/orgs/usePostUpdateCompany";

const CreateEnterpriseForm = ({ type, companyDetailsSimpleData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { link } = useParams();
  const { data: companyData, isLoading } = useGetCompanyCategory();
  const { handleCreateCompany } = usePostCreateCompany();
  const { handleUpdateCompany } = usePostUpdateCompany();
  const { handleDeleteCompany } = useDeleteCompany();

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
        company_category_id:
          companyDetailsSimpleData.company_category_id ||
          companyData?.[0]?.id ||
          "",
        user_name: companyDetailsSimpleData.user_name || "",
        description: companyDetailsSimpleData.description || "",
        employee_count: companyDetailsSimpleData.employee_count || "",
        website: companyDetailsSimpleData.website || "",
        company_id: companyDetailsSimpleData.id,
      });
    } else if (type === "create" && companyData?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        company_category_id: companyData[0].id,
      }));
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

  function onSubmitCreateCompany(formData) {
    handleCreateCompany(formData, {
      onSuccess: () => {
        toast.success(t("enterprise.createenterprise.form.createSuccess"));
        navigate(`/orgs/${formData.user_name}`);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }
  function onSubmitUpdateCompany(formData) {
    handleUpdateCompany(formData, {
      onSuccess: () => {
        toast.success(t("enterprise.createenterprise.form.updateSuccess"));
        queryClient.invalidateQueries(["companyDetailsSimple"]);
        navigate(`/orgs/${formData.user_name}`);
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  }
  function onSubmitDeleteCompany(userName) {
    handleDeleteCompany(
      { user_name: userName },
      {
        onSuccess: () => {
          toast.success(t("enterprise.createenterprise.form.deleteSuccess"));
          queryClient.invalidateQueries(["orgsApp"]);
          navigate(`/orgs`);
        },
        onError: (error) => {
          toast.error(error);
        },
      }
    );
  }

  if (isLoading) return <DataLoader />;
  if (!isLoading && !companyData) return <ErrorPage />;
  console.log(companyDetailsSimpleData);

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
        {type === "edit" && companyDetailsSimpleData?.update_company ? (
          <button
            onClick={() => onSubmitUpdateCompany(formData)}
            type="button"
            className="main-btn create-button"
          >
            {t("enterprise.createenterprise.form.edit")}
          </button>
        ) : (
          <button
            onClick={() => onSubmitCreateCompany(formData)}
            type="button"
            className="main-btn create-button"
          >
            {t("enterprise.createenterprise.form.submit")}
          </button>
        )}

        {type === "edit" && companyDetailsSimpleData?.can_delete_company && (
          <button
            type="button"
            onClick={() => {
              onSubmitDeleteCompany(link);
              console.log(link);
            }}
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
