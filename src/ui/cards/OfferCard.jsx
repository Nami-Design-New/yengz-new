import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { updateProject, updateRequestStatus } from "../../services/apiProjects";
import {
  formatTimeDifference,
  getTimeDifference,
  truncateText,
} from "../../utils/helpers";
import StarsList from "../StarList";
import EditProjectOfferModal from "../modals/EditProjectOfferModal";
import OrderModal from "./OrderModal";
import ChargeModal from "./ChargeModal";
import { toast } from "sonner";

function OfferCard({ request, isMyProject, project }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmPayModel, setShowConfirmPayModel] = useState(false);
  const { user } = useSelector((state) => state.authedUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeDifference = getTimeDifference(request?.created_at);
  const formattedTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );
  const [btn1Loading, setBtn1Loading] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);

  const handleCreateRoom = () => {
    sessionStorage.setItem("request_type", "project");
    sessionStorage.setItem("request_id", request?.project_id);
    sessionStorage.setItem("owner_id", user?.id);
    sessionStorage.setItem("applied_id", request?.user?.id);
    navigate(`/chat`);
  };

  const handleRefuseOffer = async () => {
    try {
      await updateRequestStatus(request?.id, "refused", queryClient);
      toast.success(t("projects.requestRefused"));
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      setLoading(true);
      await updateRequestStatus(request?.id, "accepted", queryClient);
      toast.success(t("projects.requestAccepted"));
      setShowConfirmPayModel(false);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };
  console.log('offer card =====' , request);
  
  return (
    <div className="comment offer-card">
      <div className="d-flex justify-content-between">
        <div className="userCommented">
          <Link to={`/profile/${request?.user?.id}`}>
            <img
              className="userImg"
              src={request?.user?.image}
              alt="صورة المستخدم"
            />
          </Link>
          <div className="lastUser">
            <Link to={`/profile/${request?.user?.id}`} className="name">
              {request?.user?.name} <StarsList rate={request?.user?.rate} />
            </Link>
            <p className="time">
              <i className="fa-regular fa-timer"></i> {formattedTime}
            </p>
          </div>
        </div>
        {(isMyProject || user?.id === request?.user?.id) && (
          <div
            className="d-flex gap-3 align-items-center"
            style={{ height: "fit-content" }}
          >
            {isMyProject && (
              <button className="butn" onClick={handleCreateRoom}>
                <i className="fa-regular fa-message-lines"></i>
              </button>
            )}
            {request?.status === "in_progress" && (
              <div className="setting">
                {user?.id === request?.user?.id ? (
                  <button
                    className="refuse_btn"
                    onClick={() => setShowEditModal(true)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                    {t("projects.editOffer")}
                  </button>
                ) : (
                  <>
                    <button
                      className="edit_btn text-white bg-success"
                      onClick={() =>
                        user?.wallet < request?.price
                          ? setShowChargeModal(true)
                          : setShowConfirmPayModel(true)
                      }
                    >
                      <i className="fa-regular fa-check"></i>{" "}
                      {t("projects.acceptOffer")}
                    </button>
                    <button className="refuse_btn" onClick={handleRefuseOffer}>
                      <i className="fa-regular fa-cancel"></i>{" "}
                      {t("projects.refuseOffer")}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {(isMyProject || user?.id === request?.user?.id) && (
        <div className="about_offer">
          <div className="block">
            <h6>{t("projects.price")}:</h6>
            <p>${request?.price}</p>
          </div>
          <div className="block">
            <h6>{t("projects.deliveryTime")}:</h6>
            <p>
              {request?.days} {t("projects.days")}
            </p>
          </div>
        </div>
      )}

      <p className="text">
        {isMyProject || user?.id === request?.user?.id
          ? request?.description
          : truncateText(request?.description, 150)}
      </p>

      <EditProjectOfferModal
        request={request}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />

      <OrderModal
        setShowModal={setShowConfirmPayModel}
        loading={loading}
        showModal={showConfirmPayModel}
        ballance={user?.wallet}
        cartTotalPrice={request?.price}
        eventFunction={handleAcceptOffer}
      />
      <ChargeModal
        showModal={showChargeModal}
        setShowModal={setShowChargeModal}
        cartTotalPrice={request?.price}
      />
    </div>
  );
}

export default OfferCard;
