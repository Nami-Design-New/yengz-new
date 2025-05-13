import { useTranslation } from "react-i18next";
import StarsList from "../StarList";

function UserServiceCard({ service }) {
  const { t } = useTranslation();

  return (
    <div className="service-card">
      <div className="label d-flex align-items-center gap-2">
        <i className="fa-regular fa-circle-info"></i>
        <p className="p-0 m-0">{t("services.serviceCart")}</p>
      </div>
      <ul className="card-ul">
        <li className="rate d-flex justify-content-between">
          <p>
            {t("services.rates")} {service?.rate || 0}{" "}
          </p>
          <StarsList rate={service?.rate || 0} />
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.buyers")}</p>
          <span>{service?.orders_count || 0}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.oredersInProgress")}</p>
          <span>{service?.current_orders_count || 0}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.serviceMinimumPrice")}</p>
          <span>${service?.price}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("services.deliveryTime")}</p>
          <span>
            {service?.days} {t("day")}
          </span>
        </li>
      </ul>
      {service?.instructions && (
        <>
          <div className="label d-flex align-items-center gap-2 mt-3">
            <i className="fa-regular fa-circle-info"></i>
            <p className="p-0 m-0">{t("services.instructions")}</p>
          </div>
          <p>{service?.instructions}</p>
        </>
      )}
    </div>
  );
}

export default UserServiceCard;
