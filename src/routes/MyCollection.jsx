import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import useAddCollectionToCard from "../hooks/collections/useAddCollectionToCard";
import useDeleteCollection from "../hooks/collections/useDeleteCollection";
import useGetCollection from "../hooks/collections/useGetCollection";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import EditCollectionModal from "../ui/modals/EditCollectionModal";
import SectionHeader from "../ui/SectionHeader";
import ErrorPage from "./ErrorPage";
import ServiceCard from "../ui/cards/ServiceCard";

const MyCollection = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: collection, isLoading } = useGetCollection(id);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { addCollectionToCart, isAdding } = useAddCollectionToCard();
  const { removeCollection, isPending: isDeletingColletion } =
    useDeleteCollection();

  if (isLoading) {
    <DataLoader />;
  }

  if (!isLoading && !collection) {
    return <ErrorPage />;
  }

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
    <>
      <SectionHeader title={collection?.data?.title} />
      <section className="myCollections">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="row">
              <div className="actions col-12 p2 w-100 d-flex justify-content-end mb-4">
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
                    className={
                      isAdding ? "fa-regular fa-circle-notch fa-spin" : ""
                    }
                  />
                  {t("cart.addTocart")}
                </button>
              </div>
              {collection?.data && collection?.data?.services?.length > 0 ? (
                collection?.data?.services?.map((service) => (
                  <div
                    className="col-lg-3 col-md-6 col-12 p2"
                    key={service?.id}
                  >
                    <ServiceCard service={service} />
                  </div>
                ))
              ) : (
                <EmptyData>{t("emptyCollection")}</EmptyData>
              )}
            </div>
          )}
        </div>
      </section>
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
    </>
  );
};

export default MyCollection;
