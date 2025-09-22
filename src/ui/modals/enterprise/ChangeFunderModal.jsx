import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import useGetFirstTeamMembers from "../../../hooks/orgs/useGetFirstTeamMembers";
import usePostChangeSponsor from "../../../hooks/orgs/usePostChangeSponsor";
import SubmitButton from "../../forms/SubmitButton";

function ChangeFunderModal({ setShowModal, showModal }) {
  const { t } = useTranslation();
  const { link } = useParams();
  const { data: getFirstTeamMembersData } = useGetFirstTeamMembers(link);
  const [userId, setUserId] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  console.log("getFirstTeamMembersData +=====", getFirstTeamMembersData);
  const { handleChangeSponsor } = usePostChangeSponsor();
  function onSubmitChangeSponsor(data, userId) {
    handleChangeSponsor(
      {
        user_name: data,
        user_id: userId,
      },
      {
        onSuccess: () => {
          toast.success(t("success accept"));
          console.log(data, userId); 
          setShowModal(false)
        },
        onError: (error) => {
          toast.error(error?.response?.message || "failed to accept");
          console.error(error);
          console.log(data, userId);
        },
      }
    );
  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        تغيير الممول
      </Modal.Header>
      <Modal.Body className="pay_modal gap-2 ">
        <div className="change__funder__modal--body">
          <p className="hint">يجب أن يكون الممول أحد أعضاء فريق المؤسسين</p>
          {getFirstTeamMembersData?.map((team) => (
            <Link
              key={team.user_id}
              onClick={() => {
                setUserId(team.user_id);
                setSelectedItem(team.user_id); // <-- هنا بنحدد مين اللي اختير
              }}
              className={`funder modal-active mt-3 ${
                selectedItem === team.user_id
                  ? "border border-2 border-black"
                  : ""
              }`}
            >
              <img
                src={team?.user?.image}
                alt="funder"
                className="funder__image"
              />
              <div className="funder__info">
                <p className="funders__info--name">{team?.user?.name}</p>
                <div className="funders__info--job">
                  <span>
                    <i className="fa-solid fa-briefcase"></i>
                    <span>{team?.user?.job_title || "job title"}</span>
                  </span>
                  <span>
                    <i className="fa-solid fa-clock"></i>
                    <span>
                      {new Date(team?.user?.last_login).toLocaleTimeString()}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>

          <SubmitButton
            onClick={() => onSubmitChangeSponsor(link, userId)}
            name={t("auth.confirm")}
            className={"delete-btn"}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeFunderModal;
