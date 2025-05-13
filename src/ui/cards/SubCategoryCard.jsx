import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ChooseCategoryPath from "../modals/ChooseCategoryPath";

const SubCategoryCard = ({ subCategory }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="category-card"
        data-aos="fade-up"
        onClick={() => {
          setShowModal(true);
          setTargetedSubCategory(subCategory);
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="inner-card">
          <div className="category-img">
            <img src={subCategory?.image} alt="" />
          </div>
          <div className="category-content">
            <div className="top-area">
              <h6 className="title mb-1">
                {subCategory?.count
                  ? `${subCategory?.count} ${t("home.service")}`
                  : `${t("home.noService")}`}
              </h6>
              <h5 className="text">{subCategory?.name || "تصميم وابداع"}</h5>
            </div>
          </div>
        </div>
      </div>
      <ChooseCategoryPath
        subCategory={subCategory}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default SubCategoryCard;
