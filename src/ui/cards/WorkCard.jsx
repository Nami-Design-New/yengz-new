import React from "react";

const WorkCard = ({
  work,
  canEdit,
  onDeleteModalShow,
  onEditModalShow,
  onViewModalShow,
}) => {
  return (
    <div
      className="workCard"
      onClick={(e) => {
        e.stopPropagation();
        onViewModalShow(work);
      }}
    >
      <div className="img">
        <img src={work?.images?.[0]?.image} alt="" />
        {canEdit && (
          <div className="icons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditModalShow(work);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteModalShow(work?.id);
              }}
            >
              <i className="fa-regular fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      <h4>{work?.title || "مشروع"}</h4>
    </div>
  );
};

export default WorkCard;
