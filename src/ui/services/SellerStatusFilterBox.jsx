import { useTranslation } from "react-i18next";

function SellerStatusFilterBox({
  user_verification,
  user_available,
  onChange,
}) {
  const { t } = useTranslation();

  return (
    <ul className="seller-level">
      <h6>{t("search.sellerStatus")}</h6>
      <ul>
        <li>
          <input
            type="checkbox"
            id="user_verification"
            name="user_verification"
            checked={user_verification === 1}
            onChange={onChange}
          />
          <label htmlFor="user_verification">{t("search.verificated")}</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="user_available"
            name="user_available"
            checked={user_available === 1}
            onChange={onChange}
          />
          <label htmlFor="user_available">{t("search.availabilty")}</label>
        </li>
      </ul>
    </ul>
  );
}

export default SellerStatusFilterBox;
