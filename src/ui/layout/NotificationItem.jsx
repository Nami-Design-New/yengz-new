import { useState } from "react";
import { Link, useLocation } from "react-router";
import { calculateDate } from "../../utils/helpers";
import useGetCommunityPostDetails from "../../hooks/community/useGetCommunityPostDetails";

function NotificationItem({ notification }) {
  const currentPath = useLocation().pathname;
  const [imgError, setImgError] = useState(false);

  const { isLoading, data: post } = useGetCommunityPostDetails(
    notification?.request_type === "community" ? notification?.request_id : null
  );

  console.log(notification);

  let status = "";

  switch (notification?.status) {
    case "pending":
      status = <i className="fa-solid fa-hourglass-end"></i>;
      break;
    case "accepted":
      status = <i className="fa-regular fa-check"></i>;
      break;
    case "refused":
      status = <i className="fa-regular fa-xmark"></i>;
      break;
    case "comment":
      status = <i className="fa-regular fa-message"></i>;
      break;
    default:
      break;
  }

  return (
    <Link
      to={`${notification?.request_type === "admin" ? currentPath : ""}${
        notification?.request_type === "service_status"
          ? `/services/${notification?.request_id}`
          : ""
      }${
        notification?.request_type === "project_status"
          ? `/projects/${notification?.request_id}`
          : ""
      }${
        notification?.request_type === "community"
          ? `/community/${post?.category_name}/${notification?.request_id}`
          : ""
      }${
        notification?.request_type === "service_order" ? `/recieved-orders` : ""
      }`}
      className="d-flex align-items-start flex-wrap"
      onClick={(e) => {
        if (isLoading && notification?.request_type === "community") {
          e.preventDefault();
        }
      }}
    >
      <div className="text-wrap ">
        <div className="header d-flex align-items-center gap-3 justify-content-between">
          <div className="image-wrapper">
            {imgError ? (
              <i className="fa-regular fa-bell"></i>
            ) : (
              <img
                src={notification?.image}
                alt={notification?.title}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div
            className="d-flex justify-content-between flex-column "
            style={{ flex: "1 0" }}
          >
            <div className="d-flex align-items-start gap-2 justify-content-between">
              <h6>{notification?.title}</h6>
              {notification?.status && (
                <span className={`status ${notification?.status}`}>
                  {status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="info d-flex gap-1 justify-content-between flex-column">
          <p>{notification?.description}</p>
          <span className="time w-100 d-flex justify-content-end">
            {calculateDate(notification?.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default NotificationItem;
