import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultiSelect = ({
  label,
  options,
  selectedOptions,
  handleChange,
  error,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <div className="input-field">
      <label htmlFor={props.id}>{label} <b style={{ color: "red" }}>*</b></label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={t("choose")}
        {...props}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
};

export default MultiSelect;
