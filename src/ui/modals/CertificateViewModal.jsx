import React from "react";
import { Modal } from "react-bootstrap";

const CertificateViewModal = ({
  showModal,
  setShowModal,
  targetCertificate
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
      size="lg"
    >
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="col-12 p-2">
        <div className="certificate-view-modal">
          <img src={targetCertificate?.image} alt="" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CertificateViewModal;
