import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useSearchWorks from "../hooks/portfolio/useSearchWorks";
import WorkViewModal from "../ui/modals/WorkViewModal";
import PortfolioFilterSidebar from "../ui/portfolio/PortfolioFilterSidebar";
import PortfolioList from "../ui/portfolio/PortfolioList";
import SectionHeader from "../ui/SectionHeader";
import FilterToggleButton from "../ui/freelancers/FilterToggleButton";

/**
 * Portfolios component - main container for the portfolios page
 * Refactored to follow SOLID principles with clear separation of concerns
 */
const Portfolios = () => {
  const { t } = useTranslation();
  // State for modal and selected portfolio
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState({});

  const { data: portfolios, isLoading } = useSearchWorks();

  return (
    <>
      <SectionHeader />
      <section className="portfolios search-section">
        <div className="container">
          <div className="row">
            {/* Filter sidebar - extracted to separate component */}
            <PortfolioFilterSidebar
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />

            {/* Mobile filter header */}
            <FilterToggleButton
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              title={t("routes.portfolios")}
            />

            {/* Portfolio list - extracted to separate component */}
            <div className="col-lg-9 col-12 p-2">
              <PortfolioList
                portfolios={portfolios}
                isLoading={isLoading}
                setRow={setSelectedPortfolio}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
          {/* Portfolio view modal */}
          <WorkViewModal
            showModal={isModalOpen}
            setShowModal={setIsModalOpen}
            targetWork={selectedPortfolio}
          />
        </div>
      </section>
    </>
  );
};

export default Portfolios;
