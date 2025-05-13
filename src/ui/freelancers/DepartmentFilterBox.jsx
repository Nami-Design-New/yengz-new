import { useTranslation } from "react-i18next";
import useCategorieListWithSub from "../../hooks/categories/useCategorieListWithSub";
import CheckBoxContainer from "../forms/CheckBoxContainer";

function DepartmentFilterBox({
  categoriesValue,
  sub_categoriesValue,
  onChange,
  categoriesWithSubCategories: propCategoriesWithSubCategories,
}) {
  const { t } = useTranslation();
  const { data: hookCategoriesWithSubCategories } = useCategorieListWithSub();

  // Use categories from props if provided, otherwise use from hook
  const categoriesWithSubCategories =
    propCategoriesWithSubCategories || hookCategoriesWithSubCategories;
  return (
    <div className="departments w-100">
      {categoriesWithSubCategories &&
        categoriesWithSubCategories.length > 0 && (
          <>
            <h6>{t("search.category")}</h6>
            <ul className="deps">
              {categoriesWithSubCategories.map((item) => (
                <CheckBoxContainer
                  key={item.id}
                  item={item}
                  categoriesValue={categoriesValue}
                  sub_categoriesValue={
                    sub_categoriesValue ? sub_categoriesValue : null
                  }
                  onChange={onChange}
                />
              ))}
            </ul>
          </>
        )}
    </div>
  );
}

export default DepartmentFilterBox;
