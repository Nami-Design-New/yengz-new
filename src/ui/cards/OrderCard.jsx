import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../../utils/constants";

function OrderCard({ order, type }) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const timeDifference = getTimeDifference(order.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  return (
    <div className="service container">
      <div className="row gap-lg-0 gap-3">
        <div className="col-lg-7 col-12">
          <div className="service-head h-100">
            <Link
              to={`/profile/${order?.user?.id}`}
              className="request-owner-img"
            >
              <img src={order?.user?.image} alt="service" />
            </Link>
            <div className="title requester-title">
              <Link to={`/profile/${order?.user?.id}`} className="owner">
                <span>{order?.user?.name}</span>
              </Link>
              <h5>
                {type === "project" ? order?.title : order?.service?.title}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-12">
          <div className="progress-card">
            <div className="progress-details">
              <div className="pro-container">
                <p className="status">
                  {lang === "ar"
                    ? ORDER_STATUS_AR[order?.status]
                    : ORDER_STATUS_EN[order?.status]}
                </p>
                <div className="progress">
                  <div
                    className={`progress-bar ${order?.status}`}
                    role="progressbar"
                    style={{
                      width: `${ORDER_STATUS_PERSENTAGE[order?.status]}%`,
                    }}
                    aria-valuenow={ORDER_STATUS_PERSENTAGE[order?.status]}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link
                to={`/${
                  type === "project" ? "projects-orders" : "recieved-orders"
                }/${order.id}?page=${searchParams.get("page") || 1}`}
                className="details"
              >
                {t("details")}
              </Link>
            </div>
            <div className="time-price">
              <span className="d-flex align-items-center gap-2">
                <i className="fa-sharp fa-light fa-clock"></i> {formattedTime}
              </span>
              <h5 className="mb-0">
                {order?.price} <i className="fa-regular fa-dollar-sign"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
