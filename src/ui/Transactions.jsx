import { useTranslation } from "react-i18next";
import useGetWalletOperations from "../hooks/wallet/useGetWalletOperations";
import { Link, useSearchParams } from "react-router";
import { useState } from "react";
import { TRANSACTIONS_STATUS } from "../utils/constants";
import DataLoader from "./DataLoader";
import { formattedDate } from "../utils/helpers";
import EmptyData from "./EmptyData";
import CustomPagination from "./CustomPagination";


function Transactions() {
  const { t } = useTranslation();
  const { data: transactions, isLoading } = useGetWalletOperations();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "";

  const [searchFilterData, setSearchFilterData] = useState(
    statusParam ? statusParam.split("-") : []
  );

  function handleApplyFilters() {
    if (searchFilterData.length > 0) {
      if (searchFilterData.includes("all")) {
        searchParams.delete("status");
      } else {
        searchParams.set(
          "status",
          searchFilterData.filter((filter) => filter !== "all").join("-")
        );
      }
    } else {
      searchParams.delete("status");
    }
    // Reset the page parameter to 1 when applying filters
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheckboxChange = (e) => {
    setSearchFilterData((prevState) => {
      if (e.target.value === "all") {
        if (e.target.checked) {
          return TRANSACTIONS_STATUS;
        } else {
          return [];
        }
      } else {
        const updatedStatuses = e.target.checked
          ? [...prevState, e.target.value]
          : prevState.filter((status) => status !== e.target.value);

        const allStatuses = TRANSACTIONS_STATUS.filter(
          (status) => status !== "all"
        );
        const areAllStatusesChecked = allStatuses.every((status) =>
          updatedStatuses.includes(status)
        );

        if (areAllStatusesChecked) {
          return ["all", ...updatedStatuses];
        } else {
          return updatedStatuses.filter((status) => status !== "all");
        }
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters();
  }

  return (
    <div className="transactions-wrapper">
      <h3>{t("balance.transactions")}</h3>
      <div className="row">
        <div className="col-lg-3 col-12 p-2">
          <div className="transactions-aside">
            <form onSubmit={handleSubmit}>
              <ul className="order-status">
                {TRANSACTIONS_STATUS.map((status) => (
                  <li
                    key={status}
                    className="d-flex align-items-center gap-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      id={status}
                      name="order-filter"
                      value={status}
                      checked={searchFilterData.includes(status)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={status}>
                      {t(`transactions.${status}`)}
                    </label>
                  </li>
                ))}
                <div className="row mt-3">
                  <div className="search-btn p-0" onClick={handleApplyFilters}>
                    <button type="submit">{t("search.apply")}</button>
                  </div>
                </div>
              </ul>
            </form>
          </div>
        </div>
        <div className="col-lg-9 col-12 p-2">
          {isLoading ? (
            <DataLoader />
          ) : transactions?.data && transactions?.data?.length > 0 ? (
            <div className="transactions-body">
              {transactions?.data?.map((transaction, index) => (
                <Link
                  to={`${
                    transaction?.service_order_id || transaction?.project_id
                      ? transaction?.service_order_id
                        ? `/recieved-orders/${transaction?.service_order_id}`
                        : `/projects-orders/${transaction?.project_id}`
                      : ""
                  }`}
                  className="transaction-box"
                  key={index}
                >
                  <div className="money-wrapper">
                    <h5>
                      {transaction?.price}
                      <i className="fa-solid fa-dollar-sign"></i>
                    </h5>
                  </div>
                  <div className="info-wrapper">
                    <h6 className="info-header">{transaction?.title}</h6>
                    <div className="info-boxes-wrapper">
                      <div className="info-box">
                        <i className="fa-regular fa-timer"></i>
                        {formattedDate(transaction?.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {transactions?.total > 8 && (
                <CustomPagination count={transactions?.total} pageSize={8} />
              )}
            </div>
          ) : (
            <EmptyData>{t("balance.noTransactions")}</EmptyData>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
