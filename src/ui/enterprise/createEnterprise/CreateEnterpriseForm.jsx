import React from "react";
import InputField from "../../forms/InputField";
import SelectField from "../../forms/SelectField";
import { useNavigate } from "react-router";

const CreateEnterpriseForm = () => {
  const navigate = useNavigate();
  return (
    <form className="create-enterprise-form">
      <div className="create-enterprise-form-wrapper">
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <InputField label={"الاسم"} />
          </div>
          <div className="col-12 col-md-6 p-2">
            <SelectField label={"المجال"} />
          </div>
          <div className="col-12  p-2">
            <InputField label={"الرابط"} />
            <span className="hint">
              يجب أن يكون فريدًا ومؤلفًا من أحرف إنجليزية وأرقام فقط وعوارض
              سفلية (_) بينها فقط.
            </span>
          </div>
          <div className="col-12  p-2">
            <label className="d-block mb-2">الوصف</label>
            <textarea className="desc-field"></textarea>
          </div>
          <div className="col-12 col-md-6 p-2">
            <SelectField label={"عدد الموظفين "} />
          </div>
          <div className="col-12 col-md-6 p-2">
            <InputField
              label={"الموقع الإلكتروني"}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          navigate("/orgs/link");
        }}
        className="main-btn create-button"
      >
        أنشاء
      </button>
    </form>
  );
};

export default CreateEnterpriseForm;
