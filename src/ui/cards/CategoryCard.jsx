import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  const { t } = useTranslation();
  return (
    <div className="category-card" data-aos="fade-up">
      <Link to={`/categories/${category.id}`} className="inner-card">
        <div className="category-img">
          <img src={category?.image} alt="" />
        </div>
        <div className="category-content">
          <div className="top-area">
            <h6 className="title mb-1">
              {category?.count
                ? `${category?.count} ${t("home.service")}`
                : `${t("home.noService")}`}
            </h6>
            <h5 className="text">{category?.name || ""}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
