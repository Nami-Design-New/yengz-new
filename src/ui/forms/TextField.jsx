import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TextField({
  label,
  error,
  icon,
  toolTipContent,
  ...props
}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );
  return (
    <div className="input-field">
      <label htmlFor={props.id}>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            {icon} {label} <b style={{ color: "red" }}>*</b>
          </span>
          {toolTipContent && (
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip({
                content: toolTipContent,
              })}
            >
              <i className="info-label fa-light fa-circle-info"></i>
            </OverlayTrigger>
          )}
        </div>
      </label>
      <Form.Control as={"textarea"} className="form-control" {...props} />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </div>
  );
}
