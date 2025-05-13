import React from "react";
import SectionHeader from "../ui/SectionHeader";
import EmptyData from "../ui/EmptyData";
import CategoryCard from "../ui/cards/CategoryCard";
import useCategoriesList from "../hooks/categories/useCategoriesList";
import DataLoader from "../ui/DataLoader";

const Categories = () => {
  const { isLoading, data } = useCategoriesList();
  return (
    <>
      <SectionHeader />
      <section className="department">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <DataLoader />
            ) : data && data?.length > 0 ? (
              data.map((category) => (
                <div className="col-lg-3 col-6 p-2" key={category.id}>
                  <CategoryCard category={category} />
                </div>
              ))
            ) : (
              <EmptyData>Sorry, there are no categories available.</EmptyData>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
