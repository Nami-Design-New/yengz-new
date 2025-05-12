import React from "react";

const CheckBoxFilterItem = ({ sub_category, onChange, checked }) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input checkBox"
        id={`sub_category-${sub_category.id}`}
        value={sub_category.id}
        name="sub_categories"
        checked={checked}
        onChange={onChange}
      />
      <label
        className="form-check-label"
        htmlFor={`sub_category-${sub_category.id}`}
      >
        {sub_category.name}
      </label>
    </div>
  );
};

export default CheckBoxFilterItem;
