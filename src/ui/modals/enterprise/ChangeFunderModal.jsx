import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../forms/SubmitButton";
import { Link } from "react-router";

function ChangeFunderModal({ setShowModal, showModal }) {
  const { t } = useTranslation();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        تغيير الممول
      </Modal.Header>
      <Modal.Body className="pay_modal gap-2">
        <div className="change__funder__modal--body">
          <p className="hint">يجب أن يكون الممول أحد أعضاء فريق المدراء</p>
          <Link className="funder modal-active">
            <img
              src="/images/enterprise/img_avatar.png"
              alt="funder"
              className="funder__image"
            />
            <div className="funder__info">
              <p className="funders__info--name">Mahmoud Abbas</p>
              <div className="funders__info--job">
                <span>
                  <i className="fa-solid fa-briefcase"></i>
                  <span>مطور واجهات أمامية</span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>

          <SubmitButton name={t("auth.confirm")} className={"delete-btn"} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangeFunderModal;
