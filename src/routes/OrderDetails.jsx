import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router";
import useGetOrder from "../hooks/order/useGetOrder";
import useServiceOrdersList from "../hooks/order/useServiceOrdersList";
import useUpdateOrder from "../hooks/order/useUpdateOrder";
import useGetPurchases from "../hooks/Purchases/useGetPurchases";
import DataLoader from "../ui/DataLoader";
import SubmitButton from "../ui/forms/SubmitButton";
import AddRateModal from "../ui/modals/AddRateModal";
import {
  ORDER_STATUS_AR,
  ORDER_STATUS_EN,
  ORDER_STATUS_PERSENTAGE,
} from "../utils/constants";
import {
  calculateExpectedEndDate,
  formatTimeDifference,
  getTimeDifference,
} from "../utils/helpers";
import ErrorPage from "./ErrorPage";

const OrderDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { refetch: refetchOrders } = useServiceOrdersList(page);
  const { refetch: refetchPurchases } = useGetPurchases(page);
  const { data: order, isLoading } = useGetOrder(id);

  const [userType, setUserType] = useState(null);
  const [btn1Loading, setBtn1Loading] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authedUser.user);
  const lang = useSelector((state) => state.language.lang);
  const { mutate: updateOrderMutation } = useUpdateOrder();

  const timeDifference = getTimeDifference(order?.created_at);
  const startTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  let expectedEndDate = calculateExpectedEndDate(
    order?.created_at,
    order?.days
  );

  useEffect(() => {
    if (user?.id && order?.user?.id) {
      if (user?.id === order?.user?.id) {
        setUserType("seller");
      } else {
        setUserType("buyer");
      }
    }
  }, [user?.id, order?.user?.id]);

  const handleUpdateOrder = (status) => {
    if (!order?.id) return;
    status === "canceled" ? setBtn1Loading(true) : setLoading(true);

    updateOrderMutation(
      { orderId: order.id, status },
      {
        onSuccess: () => {
          refetchOrders();
          refetchPurchases();
        },
        onSettled: () => {
          setLoading(false);
          setBtn1Loading(false);
        },
      }
    );
  };

  const handleRequestRoom = () => {
    sessionStorage.setItem("request_type", "service");
    sessionStorage.setItem("request_id", order?.service?.id);
    sessionStorage.setItem(
      "owner_id",
      userType === "seller" ? order?.user?.id : user?.id
    );
    sessionStorage.setItem(
      "applied_id",
      userType === "seller" ? user?.id : order?.user?.id
    );
  };

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !order) {
    return <ErrorPage />;
  }

  return (
    <section className="cart-section container">
      <div className="row">
        {order?.service?.refuse_reason !== null && (
          <div className="col-12 p-2 mb-3">
            <div className="refuse_reason">
              <p>
                {t("services.refuseReason")}: {order?.service?.refuse_reason}
              </p>
            </div>
          </div>
        )}
        <div className="col-12">
          <div className="service container">
            <div className="row justify-content-center">
              <div className="col-lg-9 col-12 mb-5">
                <div className="service-head">
                  <Link to={`/services/${order?.service?.id}`} className="img">
                    <img
                      src={order?.service?.image || "/images/bann.webp"}
                      alt="service"
                    />
                  </Link>
                  <div className="title">
                    <h5>{order?.service?.title}</h5>
                    <div className="owner">
                      <div className="owner-avatar">
                        <img
                          src={order?.user?.image || "/images/avatar.jpg"}
                          alt="owner"
                        />
                      </div>
                      <span>{order?.user?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="products-card">
                  <ul className="order">
                    <li>
                      <p>{t("recievedOrders.orderNumber")}</p>
                      <div className="price-count">
                        <span className="order-number">#{order?.id}</span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.orderValue")}</p>
                      <div className="price-count">
                        <span className="price">
                          {order?.price}{" "}
                          <i className="fa-regular fa-dollar-sign"></i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.orderDate")}</p>
                      <div className="price-count">
                        <span>{startTime}</span>
                      </div>
                    </li>
                    <li>
                      <p>{t("recievedOrders.expectedDeliveryDate")}</p>
                      <div className="price-count">
                        <span>{expectedEndDate}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="progress-card order-d">
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
                      to="/chat"
                      className="chat"
                      onClick={handleRequestRoom}
                    >
                      <i className="fa-light fa-message-lines"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 order-buttons">
                {/* buyer */}
                {userType === "buyer" && order?.status === "new" && (
                  <SubmitButton
                    loading={loading}
                    className="report-order"
                    name={t("recievedOrders.acceptOrder")}
                    icon={<i className="fa-light fa-circle-check"></i>}
                    onClick={() => handleUpdateOrder("in_progress")}
                  />
                )}
                {userType === "buyer" && order?.status === "in_progress" && (
                  <SubmitButton
                    loading={loading}
                    className="report-order"
                    name={t("recievedOrders.readyForDelevier")}
                    icon={<i className="fa-light fa-circle-check"></i>}
                    onClick={() => handleUpdateOrder("ready")}
                  />
                )}
                {userType === "buyer" &&
                  order?.status !== "canceled" &&
                  order?.status !== "received" && (
                    <SubmitButton
                      className="cancle-order"
                      loading={btn1Loading}
                      onClick={() => handleUpdateOrder("canceled")}
                      name={t("recievedOrders.cancleOrder")}
                      icon={
                        <i className="fa-sharp fa-light fa-circle-xmark"></i>
                      }
                    />
                  )}
                {/* seller */}
                {userType === "seller" && order?.status === "ready" && (
                  <SubmitButton
                    loading={loading}
                    className="report-order"
                    name={t("recievedOrders.recieve")}
                    icon={<i className="fa-light fa-circle-check"></i>}
                    onClick={() => handleUpdateOrder("received")}
                  />
                )}
                {userType === "seller" && order?.status === "new" && (
                  <SubmitButton
                    className="cancle-order"
                    loading={btn1Loading}
                    onClick={() => handleUpdateOrder("canceled")}
                    name={t("recievedOrders.cancleOrder")}
                    icon={<i className="fa-sharp fa-light fa-circle-xmark"></i>}
                  />
                )}
                {userType === "seller" &&
                  !order?.service?.is_rated &&
                  order?.status === "received" && (
                    <SubmitButton
                      className="report-order"
                      name={t("recievedOrders.RateService")}
                      onClick={() => setShowRateModal(true)}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddRateModal
        order={order}
        showModal={showRateModal}
        setShowModal={setShowRateModal}
      />
    </section>
  );
};

export default OrderDetails;
