import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useServiceOrdersList from "../hooks/order/useServiceOrdersList";
import DataLoader from "../ui/DataLoader";
import CustomPagination from "../ui/CustomPagination";
import EmptyData from "../ui/EmptyData";
import OrderCard from "../ui/cards/OrderCard";
import StatusFilter from "../ui/StatusFilter";

const RecievedOrders = () => {
  const { t } = useTranslation();
  const { isLoading, data: serviceOrders } = useServiceOrdersList();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleTogglingFilter() {
    setIsFilterOpen((open) => !open);
  }
  return (
    <section className="cart-section container search-section">
      <div className="row">
        <div className={`col-lg-2`}>
          <StatusFilter
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        <div className="small-filter-header">
          <h6>{t("navbar.requestsRecieved")}</h6>
          <button className="openfilter" onClick={handleTogglingFilter}>
            <i className="fa-light fa-sliders"></i>
          </button>
        </div>
        <div className="col-lg-10 co-12">
          {isLoading ? (
            <DataLoader />
          ) : (
            <>
              {serviceOrders && serviceOrders?.data?.length > 0 ? (
                <>
                  <div className="row">
                    {serviceOrders?.data?.map((order) => (
                      <OrderCard order={order} key={order.id} />
                    ))}
                  </div>
                  {serviceOrders && serviceOrders?.total > 10 && (
                    <CustomPagination
                      count={serviceOrders?.total}
                      pageSize={10}
                    />
                  )}
                </>
              ) : (
                <EmptyData>
                  {serviceOrders?.total === 0
                    ? t("recievedOrders.emptyOrders")
                    : t("recievedOrders.noOrders")}
                </EmptyData>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecievedOrders;
