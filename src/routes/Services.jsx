import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataLoader from "../ui/DataLoader";
import useSearchServicesList from "../hooks/services/useSearchServicesList";
import ServiceFilterSidebar from "../ui/services/ServiceFilterSidebar";
import ServiceList from "../ui/services/ServiceList";
import useCategorieListWithSub from "../hooks/categories/useCategorieListWithSub";

/**
 * Services component - displays services with filtering capabilities
 * Refactored to follow SOLID principles and clean code practices
 */
const Services = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Data fetching hooks
  const { isLoading: categoriesIsLoading } = useCategorieListWithSub();
  const {
    data: searchServicesList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSearchServicesList();

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Show loader while initial data is loading
  if ((categoriesIsLoading || isFetching) && searchServicesList?.length < 10) {
    return <DataLoader />;
  }

  return (
    <section className="search-section">
      <div className="container">
        <div className="row">
          {/* Filter sidebar - extracted to a separate component */}
          <ServiceFilterSidebar
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />

          {/* Mobile filter header */}
          <div className="small-filter-header">
            <h6>{t("routes.services")}</h6>
            <button
              className="openfilter"
              onClick={() => setIsFilterOpen(true)}
            >
              <i className="fa-light fa-sliders"></i>
            </button>
          </div>

          {/* Service list - extracted to a separate component */}

          <section className="col-lg-9 p-2">
            <div className="row">
              <SortFilterBox type="services" />

              <ServiceList
                searchServicesList={searchServicesList}
                isFetching={isFetching}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Services;
