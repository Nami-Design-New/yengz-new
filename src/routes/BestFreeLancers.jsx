import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetBestFreelancers from "../hooks/freeLancers/useGetBestFreelancers";
import FilterSidebar from "../ui/freelancers/FilterSidebar";
import FilterToggleButton from "../ui/freelancers/FilterToggleButton";
import FreelancersList from "../ui/freelancers/FreelancersList";
import SectionHeader from "../ui/SectionHeader";

/**
 * BestFreeLancers - Main component for displaying the best freelancers page
 * This component has been refactored to separate concerns and reduce redundancy
 */
const BestFreeLancers = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  const { data: freelancers, isLoading: isFreelancersLoading } =
    useGetBestFreelancers();

  return (
    <>
      <SectionHeader />
      <section className="best-freelancers search-section">
        <div className="container">
          <div className="d-block d-lg-none mb-3">
            <FilterToggleButton
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              title={t("routes.freelancers")}
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
