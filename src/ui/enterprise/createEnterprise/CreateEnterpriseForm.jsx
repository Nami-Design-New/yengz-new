import React, { useEffect, useState } from "react";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
// import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import useGetCompanyCategory from "../../../hooks/orgs/useGetCompanyCategory";
import DataLoader from "../../DataLoader";

const CreateEnterpriseForm = ({ type, companyDetailsSimpleData }) => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const { data: companyData, isLoading } = useGetCompanyCategory();
  // console.log(companyDetailsSimpleData);

  // أول ما يفتح الفورم، لو edit حط القيمة الجاية من الـ props
  useEffect(() => {
    if (type === "edit" && companyDetailsSimpleData?.name) {
      setName(companyDetailsSimpleData.name);
    }
  }, [type, companyDetailsSimpleData]);

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !companyData) {
    return <ErrorPage />;
  }

  return (
    <form className="create-enterprise-form">
      <div className="create-enterprise-form-wrapper">
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.name")}
              value={type === "edit" ? name : ""}
              onChange={(e) => setName(e.target.value)} // تحديث عند الكتابة
            />
          </div>
          <div className="col-12 col-md-6 p-2">
            <SelectField
              options={companyData?.map((comp) => ({
                name: comp.name,
                value: comp.id,
              }))}
              label={t("enterprise.createenterprise.form.field")}
            />
          </div>
          <div className="col-12  p-2">
            <InputField
              label={t("enterprise.createenterprise.form.link")}
              value={type === "edit" ? companyDetailsSimpleData?.website : ""}
            />
            <span className="hint">
              {t("enterprise.createenterprise.form.linkHint")}
            </span>
          </div>
          <div className="col-12  p-2">
            <label className="d-block mb-2">
              {t("enterprise.createenterprise.form.description")}
            </label>
            <textarea
              value={
                type === "edit" ? companyDetailsSimpleData?.description : ""
              }
              className="desc-field"
            ></textarea>
          </div>
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.employeeCount")}
              value={
                type === "edit" ? companyDetailsSimpleData?.employee_count : ""
              }
            />
          </div>
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.website", "Website")}
              placeholder="https://example.com"
              value={type === "edit" ? companyDetailsSimpleData?.website : ""}
            />
          </div>
        </div>
      </div>
      <div className="buttons__wrapper">
        {type === "edit" && companyDetailsSimpleData?.update_company && (
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              // navigate("/orgs/link");
            }}
            className="main-btn create-button"
          >
            {type === "create"
              ? t("enterprise.createenterprise.form.submit")
              : t("enterprise.createenterprise.form.edit")}
          </button>
        )}
        {type === "edit" && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // navigate("/orgs/link");
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
