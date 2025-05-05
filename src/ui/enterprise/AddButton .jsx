import React from "react";

const AddButton = ({ text, icon, ...props }) => {
  return (
    <button className="add-button" {...props}>
      {icon && icon}
      <span className="text">{text}</span>
    </button>
  );
};

export default AddButton;
