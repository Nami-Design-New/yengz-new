import React from "react";
import { useTranslation } from "react-i18next";

const FinancialInfo = ({ balanceData, expensesData }) => {
  const { t } = useTranslation();
  
  return (
    <div className="balance-expenses">
      <div className="balance">
        <div className="box">
          <h4>{t("enterprise.stats.totalBalance")}</h4>
          <p>{balanceData.total || "00.00"} $</p>
        </div>
        <div className="box">
          <h4>{t("enterprise.stats.availableBalance")}</h4>
          <p>{balanceData.available || "00.00"} $</p>
        </div>
      </div>
      <div className="expenses">
        <div className="monthly">
          <span>{t("enterprise.stats.monthlySpending")}</span>
          <span>${expensesData.monthly || "0.00"}</span>
        </div>
        <div className="monthly">
          <span>{t("enterprise.stats.pendingBalance")}</span>
          <span>${expensesData.pending || "0.00"}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo;
