import React from "react";
import { useTranslation } from "react-i18next";
import { calculateDate } from "../utils/helpers";
import useGetNotifications from "../hooks/app/useGetNotifications";

const Notifcations = () => {
  const { t } = useTranslation();
  const { data: notifications } = useGetNotifications();
  console.log('data notif' , notifications);
  
  return (
    <div className="notifications_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 d-flex flex-column gap-2">
            <h5 className="title text-center">{t("notifications")}</h5>
            {notifications?.map((notification) => (
              <div className="notify">
                <div className="notify_info">
                  <div className="content">
                    <h6>{notification?.title}</h6>
                    <p>{notification?.description}</p>
                  </div>
                </div>
                <div className="date_time">
                  <span>
                    {calculateDate(notification?.created_at)}{" "}
                    <i className="fa-thin fa-calendar-days"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifcations;
