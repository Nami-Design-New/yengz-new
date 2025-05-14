import React from "react";

const CertificateCard = ({
  certificate,
  canEdit,
  onDeleteModalShow,
  onEditModalShow,
  onClick,
}) => {
  return (
    <div className="workCard">
      <div className="img">
        <img
          src={certificate?.image}
          alt={certificate?.title}
          onClick={() => onClick(certificate)}
        />
        {canEdit && (
          <div className="icons">
            <button onClick={() => onEditModalShow(certificate)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={() => onDeleteModalShow(certificate?.id)}>
              <i className="fa-regular fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      <h4 onClick={() => onClick(certificate)}>{certificate?.title}</h4>
    </div>
  );
};

export default CertificateCard;
