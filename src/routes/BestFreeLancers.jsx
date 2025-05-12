import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetBestFreelancers from "../hooks/freeLancers/useGetBestFreelancers";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";
import SectionHeader from "../ui/SectionHeader";
import DataLoader from "../ui/DataLoader";
import FilterToggleButton from "../ui/freelancers/FilterToggleButton";
import FilterSidebar from "../ui/freelancers/FilterSidebar";
import FreelancersList from "../ui/freelancers/FreelancersList";

/**
 * BestFreeLancers - Main component for displaying the best freelancers page
 * This component has been refactored to separate concerns and reduce redundancy
 */
const BestFreeLancers = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  // Data fetching hooks - only fetch what's needed in this component
  const { isLoading: isCategoriesLoading } = useCategorieListWithSub();
  const { data: freelancers, isLoading: isFreelancersLoading } =
    useGetBestFreelancers();

  // We'll let the FreelancersList component handle its own loading state

  return (
    <>
      <SectionHeader />
      <section className="best-freelancers search-section">
        <div className="container">
          <div className="d-block d-lg-none mb-3">
            <FilterToggleButton
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
          <div className="row">
            <FilterSidebar
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
            <div className="col-lg-9 col-12 p-2">
              <div className="row">
                <FreelancersList
                  freelancers={freelancers}
                  isLoading={isFreelancersLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestFreeLancers;
