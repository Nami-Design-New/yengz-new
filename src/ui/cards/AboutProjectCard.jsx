import React from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router";
import {
  calculateDate,
  formatTimeDifference,
  getTimeDifference,
} from "../../utils/helpers";

const AboutProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const timeDifference = getTimeDifference(project?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  return (
    <div className="aboutProjectCard">
      <div className="label d-flex align-items-center gap-2">
        <i className="fa-regular fa-circle-info"></i>
        <p className="p-0 m-0">{t("projects.projectCard")}</p>
      </div>
      <ul className="card-ul">
        <li className=" d-flex justify-content-between">
          <p>{t("projects.status")}</p>
          <span className="status">{project?.status_name}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.publishTime")}</p>
          <span>{formattedTime}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.budget")}</p>
          <span>${project?.price}</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.deliveryTime")}</p>
          <span>
            {project?.days} {t("day")}
          </span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.averageOffers")}</p>
          <span>{project?.request_average || 0} $</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.offers")}</p>
          <span>{project?.requests_count || 0}</span>
        </li>
        <hr />
        <h6>{t("projects.projectOwner")}</h6>
        <li className=" d-flex justify-content-between">
          <Link
            to={`/profile/${project?.user?.id}`}
            className="m-0"
            style={{ color: "#410c9e" }}
          >
            {project?.user?.name}
          </Link>
        </li>
        <li className=" d-flex justify-content-between">
          <p>{t("projects.signUpDate")}</p>
          <span>{calculateDate(project?.user?.created_at)}</span>
        </li>
      </ul>
    </div>
  );
};

export default AboutProjectCard;
