import { useTranslation } from "react-i18next";

const FinancialInfo = ({ companyDetailsData }) => {
  const { t } = useTranslation();

  return (
    <div className="balance-expenses">
      <div className="balance">
        <div className="box">
          <h4>{t("enterprise.stats.totalBalance")}</h4>
          <p>{companyDetailsData.total_balance} $</p>
        </div>
        <div className="box">
          <h4>{t("enterprise.stats.availableBalance")}</h4>
          <p>{companyDetailsData.wallet} $</p>
        </div>
      </div>
      <div className="expenses">
        <div className="monthly">
          <span>{t("enterprise.stats.monthlySpending")}</span>
          <span>${companyDetailsData.company_spent_month}</span>
        </div>
        <div className="monthly">
          <span>{t("enterprise.stats.pendingBalance")}</span>
          <span>${companyDetailsData.pedning_balance}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo;
