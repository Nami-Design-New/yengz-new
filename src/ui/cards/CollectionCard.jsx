import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useAddCollectionToCard from "../../hooks/collections/useAddCollectionToCard";
import useDeleteCollection from "../../hooks/collections/useDeleteCollection";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import ConfirmationModal from "../modals/ConfirmationModal";
import EditCollectionModal from "../modals/EditCollectionModal";

const CollectionCard = ({ collection }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { removeCollection, isPending: isDeletingColletion } =
    useDeleteCollection();
  const { addCollectionToCart, isAdding } = useAddCollectionToCard();

  const timeDifference = getTimeDifference(collection?.created_at);
  const startTime = formatTimeDifference(
    timeDifference.years,
    timeDifference.months,
    timeDifference.days,
    timeDifference.hours,
    timeDifference.minutes,
    t
  );

  const deleteCollection = () => {
    removeCollection(collection?.id, {
      onSettled: () => {
        setShowModal(false);
      },
    });
  };

  const handleAddtoCart = () => {
    addCollectionToCart(collection?.id);
  };

  return (
    <div className="col-lg-6 col-12 p-2">
      <div className="collectionCard">
        <div className="info">
          <h6>
            <Link to={`/my-collections/${collection?.id}`}>
              {collection?.title}
            </Link>
          </h6>
          <ul>
            <li>
              <i className="fa-regular fa-cubes"></i> <span>{}</span>
            </li>
            <li>
              <i className="fa-light fa-clock"></i> <span>{startTime}</span>
            </li>
          </ul>
        </div>
        <div className="actions">
          <button onClick={() => setShowEditModal(true)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => setShowModal(true)}>
            <i className="fa-regular fa-trash"></i>
          </button>
          <button
            className="btn d-flex align-items-center gap-2"
            onClick={handleAddtoCart}
          >
            <i
              className={isAdding ? "fa-regular fa-circle-notch fa-spin" : ""}
            />
            {t("cart.addTocart")}
          </button>
        </div>
      </div>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        buttonText={t("cart.deleteCollection")}
        text={t("cart.areYouSureYouWantToDeleteThisCollection")}
        eventFun={deleteCollection}
        loading={isDeletingColletion}
      />
      <EditCollectionModal
        setShowModal={setShowEditModal}
        showModal={showEditModal}
        collection={collection}
      />
    </div>
  );
};

export default CollectionCard;
