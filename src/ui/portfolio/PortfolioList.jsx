import React from "react";
import { useTranslation } from "react-i18next";
import PortfolioCard from "../cards/PortfolioCard";
import DataLoader from "../DataLoader";
import EmptyData from "../EmptyData";

/**
 * PortfolioList component - responsible for rendering the list of portfolios
 * Follows the single responsibility principle by focusing only on displaying portfolios
 */
const PortfolioList = ({ portfolios, isLoading, setRow, setIsModalOpen }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <DataLoader />;
  }

  if (!portfolios?.data?.length) {
    return (
      <EmptyData>
        {t("notFoundPlaceholder.noWorksFoundWithThisDetails")}
      </EmptyData>
    );
  }

  return (
    <div className="row">
      {portfolios.data.map((portfolio) => (
        <div className="col-lg-4 col-md-6 col-12 p-2" key={portfolio.id}>
          <PortfolioCard
            portfolio={portfolio}
            setRow={setRow}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      ))}
    </div>
  );
};

export default PortfolioList;
