import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useProjectsList from "../hooks/projects/useProjectsList";
import DataLoader from "../ui/DataLoader";
import ProjectList from "../ui/projectes/ProjectList";
import ServiceFilterSidebar from "../ui/services/ServiceFilterSidebar";
import SortFilterBox from "../ui/services/SortFilterBox";

const Projects = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Data fetching hooks
  const {
    data: searchProjectsList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useProjectsList();

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
  console.log("projects ++++++++++", {
    searchProjectsList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  });

  return (
    <section className="search-section">
      <div className="container">
        <div className="row">
          {/* Filter sidebar - extracted to a separate component */}
          <ServiceFilterSidebar
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            type="projects"
          />

          {/* Mobile filter header */}
          <div className="small-filter-header">
            <h6>{t("routes.projects")}</h6>
            <button
              className="openfilter"
              onClick={() => setIsFilterOpen(true)}
            >
              <i className="fa-light fa-sliders"></i>
            </button>
          </div>

          <div className="col-lg-9 col-12 p-2 results-wrapper">
            <div className="container">
              <div className="row">
                <SortFilterBox type="projects" />

                {isFetching && searchProjectsList?.length === 0 ? (
                  <DataLoader />
                ) : (
                  <ProjectList
                    searchProjectsList={searchProjectsList}
                    isFetching={isFetching}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
