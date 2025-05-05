import React from "react";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const CreateEnterpriseForm = ({ type }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <form className="create-enterprise-form">
      <div className="create-enterprise-form-wrapper">
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <InputField label={t("enterprise.createenterprise.form.name")} />
          </div>
          <div className="col-12 col-md-6 p-2">
            <SelectField label={t("enterprise.createenterprise.form.field")} />
          </div>
          <div className="col-12  p-2">
            <InputField label={t("enterprise.createenterprise.form.link")} />
            <span className="hint">
              {t("enterprise.createenterprise.form.linkHint")}
            </span>
          </div>
          <div className="col-12  p-2">
            <label className="d-block mb-2">
              {t("enterprise.createenterprise.form.description")}
            </label>
            <textarea className="desc-field"></textarea>
          </div>
          <div className="col-12 col-md-6 p-2">
            <SelectField
              label={t("enterprise.createenterprise.form.employeeCount")}
            />
          </div>
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={t("enterprise.createenterprise.form.website", "Website")}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
      <div className="buttons__wrapper">
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate("/orgs/link");
          }}
          className="main-btn create-button"
        >
          {type === "create"
            ? t("enterprise.createenterprise.form.submit")
            : t("enterprise.createenterprise.form.edit")}
        </button>
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
