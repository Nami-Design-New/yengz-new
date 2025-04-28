const SubmitButton = ({ loading, name, className, onClick, icon }) => {
  return (
    <button
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      onClick={onClick}
      className={`save ${className}`}
    >
      {icon && icon} {name}{" "}
      <i className={loading ? "fa-regular fa-circle-notch fa-spin" : ""} />
    </button>
  );
};

export default SubmitButton;
