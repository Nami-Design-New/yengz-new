import CheckBoxFilterItem from "./CheckBoxFilterItem";

function CheckBoxContainer({
  item,
  categoriesValue,
  sub_categoriesValue,
  onChange,
}) {
  const isParentChecked =
    categoriesValue?.includes(+item.id) ||
    item?.sub_categories.every((sub_category) =>
      sub_categoriesValue?.includes(+sub_category.id)
    );
  const isChildChecked = item?.sub_categories?.some((sub_category) =>
    sub_categoriesValue?.includes(+sub_category.id)
  );

  return (
    <li className="department-item">
      <div className="department-header">
        <label htmlFor={item.id}>
          {item?.sub_categories && sub_categoriesValue && (
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#accordion-${item.id}`}
              aria-expanded="true"
              aria-controls={`accordion-${item.id}`}
            >
              <span className="horizontal"></span>
              <span className="vertical"></span>
            </button>
          )}
          {item.name}
        </label>
        <input
          className="checkBox"
          type="checkbox"
          name="categories"
          value={item.id}
          id={item.id}
          checked={isParentChecked}
          onChange={onChange}
        />
      </div>
      {item?.sub_categories && sub_categoriesValue && (
        <div
          id={`accordion-${item.id}`}
          className="accordion-collapse collapse "
          aria-labelledby="headingOne"
          data-bs-parent=""
        >
          <div className="accordion-body">
            {item.sub_categories.map((sub_category) => (
              <CheckBoxFilterItem
                key={sub_category.id}
                name="sub_categories"
                sub_category={sub_category}
                onChange={onChange}
                checked={
                  sub_categoriesValue?.includes(+sub_category.id) ||
                  isParentChecked
                }
              />
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default CheckBoxContainer;
