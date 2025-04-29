import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({
  label,
  name,
  error,
  onChange,
  required,
  ...props
}) {
  return (
    <div className="input-field">
      {label && <label htmlFor={props?.id}>{label} {required && <b style={{ color: "red" }}>*</b>}</label>}{" "}
      
      <PhoneInput
        {...props}
        country={"sa"}
        enableSearch={true}
        onChange={(phone) => {
          onChange({
            target: {
              name,
              value: phone,
            },
          });
        }}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
