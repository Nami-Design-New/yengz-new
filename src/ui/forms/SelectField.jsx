import { Form } from "react-bootstrap";

export default function SelectField({
  options,
  disabledOption,
  required,
  error,
  ...props
}) {
  console.log(props);
  
  return (
    <div className="input-field">
      {props.label && (
        <label>
          {props.label} {required && <b style={{ color: "red" }}>*</b>}{" "}
        </label>
      )}
      <Form.Select {...props}>
        <option value={""} disabled>
          {disabledOption}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
