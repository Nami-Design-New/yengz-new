import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import StarsList from "../StarList";
import useTruncateString from "../../hooks/helper/useTruncateString";

const ServiceCard = ({ service, canEdit, handleDelete, type, showPending }) => {
  const { t } = useTranslation();
  const truncate = useTruncateString(service?.title);

  return (
    <Link
      to={`/${type === "project" ? "projects" : "services"}/${service?.id}`}
      className="service-card"
      data-aos="fade-up"
    >
      <div className="img">
        <img src={service?.image || "/images/bann.webp"} alt="" />
        {showPending && service?.accepted === 0 && (
          <div className="services_status">
            {service?.accepted === 0 && service?.refuse_reason !== null
              ? t("services.refused")
              : t("services.inReview")}
          </div>
        )}
      </div>
      <div className="content">
        <h6 className="one-line-wrap">{truncate}</h6>
        <p className="d-flex align-items-center gap-1">
          {service?.category?.name && <span>{service?.category?.name}</span>}
          {service?.category?.name && service?.sub_category?.name && (
            <span>/</span>
          )}
          {service?.sub_category?.name && (
            <span>{service?.sub_category?.name}</span>
          )}
        </p>
        <div className="d-flex gap-3 align-items-center">
          <StarsList rate={service?.rate || 0} />
          <span className="sell-count">( {service?.sell_count || 0} )</span>
        </div>
        <h6 className="start-from">
          {t("home.startFrom")} : <b>{service?.price || 0} $</b>
        </h6>
        {canEdit && (
          <div className="editService">
            <Link to={`/service/edit/${service?.id}`}>
              <i className="fa-regular fa-file-pen"></i>
            </Link>
            <Link onClick={() => handleDelete(service?.id)}>
              <i className="fa-regular fa-trash-can"></i>
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ServiceCard;
