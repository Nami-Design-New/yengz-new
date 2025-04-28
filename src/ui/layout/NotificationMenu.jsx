import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import useGetNotifications from "./../../hooks/app/useGetNotifications";

export default function NotificationMenu(user) {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { data: notifications } = useGetNotifications();

  return (
    <li
      className={`link hide-sm2 notifications ${
        lang === "en" ? "reverse" : ""
      }`}
    >
      <Dropdown style={{ position: "relative" }}>
        <Dropdown.Toggle
          style={{ backgroundColor: "#f4f4f4" }}
          id="dropdown-basic"
        >
          <i className="fa-regular fa-bell"></i>
          <span className="num-count">{user?.receive_notification || 0}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="drop_Message_Menu" align="start">
          <div className="scroll_menu">
            {notifications?.map((notification) => (
              <Fragment key={notification?.title}>
                <Dropdown.Item className="drop_Message">
                  <NotificationItem notification={notification} />
                </Dropdown.Item>
              </Fragment>
            ))}
          </div>
          <Link className="showall" to="/notifications">
            {t("navbar.allNotifications")}
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
