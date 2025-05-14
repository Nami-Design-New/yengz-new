import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetPurchases from "../hooks/Purchases/useGetPurchases";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import CustomPagination from "../ui/CustomPagination";
import StatusFilter from "../ui/StatusFilter";
import PurchaseCard from "../ui/cards/PurchaseCard";

function Purchases() {
  const { t } = useTranslation();
  const { data: purchases, isLoading } = useGetPurchases();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleTogglingFilter() {
    setIsFilterOpen((open) => !open);
  }
  return (
    <main>
      <section className="cart-section container">
        <div className="row">
          <div className="col-lg-2">
            <StatusFilter
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />
          </div>
          <div className="small-filter-header">
            <button className="openfilter" onClick={handleTogglingFilter}>
              <i className="fa-light fa-sliders"></i>
            </button>
          </div>
          <div className="col-lg-10 co-12">
            {isLoading ? (
              <DataLoader />
            ) : (
              <>
                {purchases?.data?.length === 0 ? (
                  <EmptyData>
                    {purchases?.total === 0
                      ? t("recievedOrders.emptyPurchasesWithThisState")
                      : t("recievedOrders.emptyPurchases")}
                  </EmptyData>
                ) : (
                  <>
                    <div>
                      {purchases?.data?.map((purchase) => (
                        <PurchaseCard key={purchase.id} purchase={purchase} />
                      ))}
                    </div>
                    {purchases && purchases?.total > 10 && (
                      <CustomPagination
                        count={purchases?.total}
                        pageSize={10}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Purchases;
