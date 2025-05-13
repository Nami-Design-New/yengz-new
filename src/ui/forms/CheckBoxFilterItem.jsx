import React from "react";

const CheckBoxFilterItem = ({ sub_category, onChange, checked }) => {
  return (
    <div className="form-check p-0 d-flex align-items-center justify-content-between">
      <label
        className="form-check-label"
        htmlFor={`sub_category-${sub_category.id}`}
      >
        {sub_category.name}
      </label>
      <input
        type="checkbox"
        className=" checkBox"
        id={`sub_category-${sub_category.id}`}
        value={sub_category.id}
        name="sub_categories"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckBoxFilterItem;
