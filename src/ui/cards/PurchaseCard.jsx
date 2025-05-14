import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/constants";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";

const PurchaseCard = ({ purchase }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const timeDifference = getTimeDifference(purchase?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <>
      <div className="service container">
        <div className="row responsive-gap">
          <div className="col-lg-7 col-12">
            <div className="service-head">
              <Link to={`/services/${purchase?.service?.id}`} className="img">
                <img
                  src={purchase?.service?.image || "/images/bann.webp"}
                  alt="service"
                />
              </Link>
              <div className="title">
                <h5>{purchase?.service?.title}</h5>
                <Link
                  to={`/profile/${purchase?.service?.user?.id}`}
                  className="owner"
                >
                  <div className="owner-avatar">
                    <img
                      src={
                        purchase?.service?.user?.image || "/icons/avatar.jpg"
                      }
                      alt="owner"
                    />
                  </div>
                  <span>{purchase?.service?.user?.name}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="progress-card">
              <div className="progress-details">
                <div className="pro-container">
                  <p className="status">
                    {lang === "ar"
                      ? ORDER_STATUS_AR[purchase?.status]
                      : ORDER_STATUS_EN[purchase?.status]}
                  </p>
                  <div className="progress">
                    <div
                      className={`progress-bar ${purchase?.status}`}
                      role="progressbar"
                      style={{
                        width: `${ORDER_STATUS_PERSENTAGE[purchase?.status]}%`,
                      }}
                      aria-valuenow={ORDER_STATUS_PERSENTAGE[purchase?.status]}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/purchases/${purchase?.id}?page=${page}`}
                  className="details"
                >
                  {t("details")}
                </Link>
              </div>
              <div className="time-price">
                <span>
                  <i className="fa-sharp fa-light fa-clock"></i>
                  {formattedTime}
                </span>
                <h5>
                  {purchase?.price}{" "}
                  <i className="fa-regular fa-dollar-sign"></i>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseCard;
