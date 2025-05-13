import React from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../cards/ServiceCard";
import EmptyData from "../EmptyData";
import SortFilterBox from "./SortFilterBox";

const ServiceList = ({ searchServicesList, isFetching }) => {
  const { t } = useTranslation();

  return (
    <>
      {searchServicesList.length > 0 ? (
        <>
          {searchServicesList.map((service) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
          {isFetching && (
            <div className="col-12 p-2">
              <div className="smallLoader">
                <span>
                  {t("search.loading")}{" "}
                  <i className="fa-light fa-loader fa-spin"></i>
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyData minHeight="300px">
          {t("notFoundPlaceholder.noServicesFoundWithThisDetails")}
        </EmptyData>
      )}
    </>
  );
};

export default ServiceList;
