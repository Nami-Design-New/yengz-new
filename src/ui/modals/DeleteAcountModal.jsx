import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../forms/SubmitButton";
import useDeleteAccount from "../../hooks/auth/useDeleteAccount";

function DeleteAcountModal({ setShowModal, showModal }) {
  const { t } = useTranslation();
  const { deleteAccount, isPending } = useDeleteAccount();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="pay_modal gap-2">
        <h3 className="text-end">
          {t("auth.areYouSureYouWantToDeleteYourAccount")}{" "}
        </h3>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("auth.cancel")}
          </button>

          <SubmitButton
            name={t("auth.confirm")}
            loading={isPending}
            onClick={deleteAccount}
            className={"delete-btn"}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteAcountModal;
