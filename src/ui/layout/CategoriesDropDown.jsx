import { Link } from "react-router";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useCategorieListWithSub from "./../../hooks/categories/useCategorieListWithSub";

export default function CategoriesDropDown() {
  const { data: categoriesWithSubCategories } = useCategorieListWithSub();
  const { t } = useTranslation();

  return (
    <li className="nav-link">
      <Dropdown>
        <Dropdown.Toggle className="nav-link btn">
          <i className="far fa-cube"></i> {t("navbar.categories")}
        </Dropdown.Toggle>

        <Dropdown.Menu className="categories_list">
          <div className="row">
            {categoriesWithSubCategories?.map((category) => (
              <div className="col-3 p-2" key={category.id}>
                <h4>{category.name}</h4>
                <ul>
                  {category?.sub_categories?.map((subCategory) => (
                    <li key={subCategory.id}>
                      <Link to={`/services?sub_categories=${subCategory.id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {categoriesWithSubCategories?.map((category) => (
              <div className="col-3 p-2" key={category.id}>
                <h4>{category.name}</h4>
                <ul>
                  {category?.sub_categories?.map((subCategory) => (
                    <li key={subCategory.id}>
                      <Link to={`/services?sub_categories=${subCategory.id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {categoriesWithSubCategories?.map((category) => (
              <div className="col-3 p-2" key={category.id}>
                <h4>{category.name}</h4>
                <ul>
                  {category?.sub_categories?.map((subCategory) => (
                    <li key={subCategory.id}>
                      <Link to={`/services?sub_categories=${subCategory.id}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
