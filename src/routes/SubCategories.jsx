import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useGetCategoryById from "../hooks/categories/useGetCategoryById";
import useSubCategoriesList from "../hooks/categories/useSubCategoriesList";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import SectionHeader from "../ui/SectionHeader";
import SubCategoryCard from "../ui/cards/SubCategoryCard";
import ErrorPage from "./ErrorPage";

const SubCategories = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: category } = useGetCategoryById(id);
  const { data, isLoading, isError, error } = useSubCategoriesList(id);

  if (isError) {
    return <ErrorPage />;
  }
  return (
    <>
      <SectionHeader title={category?.name} />
      <section className="department">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <DataLoader />
            ) : data && data?.length > 0 ? (
              data.map((subCategory) => (
                <div className="col-lg-3 col-6 p-2" key={subCategory.id}>
                  <SubCategoryCard
                    key={subCategory.id}
                    subCategory={subCategory}
                  />
                </div>
              ))
            ) : (
              <EmptyData>{t("no_sub_categories")}</EmptyData>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SubCategories;
