import React from "react";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router";
import StarsList from "../StarList";

const UserProfileCard = ({ user, isMyAccount }) => {
  const { t } = useTranslation();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  return (
    <div className="profile-descripe">
      <div className="banner">
        <div className="user-avatar">
          <img src={user?.image || "/icons/avatar.jpg"} alt="user-avatar" />
          {user?.verified === 1 && (
            <span className="status">
              <i className="fa-solid fa-badge-check"></i>
            </span>
          )}
        </div>
      </div>
      <div className="name-rate">
        <h6 className="mb-2">{t(user?.name)}</h6>
        <StarsList rate={user?.rate || 0} />
      </div>
      {user?.country_id && (user?.country?.name || user?.country?.image) && (
        <div className="cash profile-country-box mt-3">
          <div className="row">
            <div className="col-6 p-2">
              <div className="head">
                <h4>{t("profile.country")}</h4>
              </div>
            </div>
            <div className="country-wrapper col-6 p-2">
              <img src={user?.country?.image} alt="country" />
              <h6 className="">{user?.country?.name}</h6>
            </div>
          </div>
        </div>
      )}
      {user?.skills && user?.skills?.length > 0 && (
        <div className="cash profile-skills-box mt-3">
          <div className="row">
            <div className="col-12 p-2">
              <div className="head">
                <h4>{t("profile.skills")}</h4>
              </div>
            </div>
            <div className="profile-skills p-2">
              {user?.skills?.map(
                (skill) =>
                  skill?.name && (
                    <div className="cash-info">
                      <h6>{skill.name}</h6>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
      {isMyAccount && (
        <div className="cash mt-3">
          <div className="row">
            <div className="col-12 p-2">
              <div className="head">
                <h4>
                  <i className="fa-regular fa-circle-info"></i>{" "}
                  {t("profile.balance")}
                </h4>
                <Link to="/balance">{t("profile.withdraw")}</Link>
              </div>
            </div>
            <div className="col-6 p-2">
              <div className="cash-info">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("profile.totalBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.totalBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.total_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <div className="col-6 p-2">
              <div className="cash-info">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("profile.pendingBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.pendingBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.pending_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <div className="col-6 p-2">
              <div className="cash-info">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("profile.availableBalance")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.availableBalanceTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.available_balance}{" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <div className="col-6 p-2">
              <div className="cash-info">
                <span className="d-flex align-items-center justify-content-between w-100">
                  {t("profile.wallet")}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={renderTooltip({
                      content: t("profile.walletTooltip"),
                    })}
                  >
                    <i className="info-label fa-light fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
                <h6>
                  {user?.wallet} <i className="fa-solid fa-dollar-sign"></i>
                </h6>
              </div>
            </div>
            <div className="col-12 p-2 d-flex align-items-center justify-content-center">
              <Link to="/balance" className="deposit-link">
                <i className="fa-regular fa-circle-plus"></i>{" "}
                {t("profile.deposit")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
