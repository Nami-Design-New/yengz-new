import React from "react";
import { useTranslation } from "react-i18next";
import useCollectionsList from "../hooks/collections/useCollectionsList";
import SectionHeader from "../ui/SectionHeader";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import CollectionCard from "../ui/cards/CollectionCard";
import CustomPagination from "../ui/CustomPagination";

const MyCollections = () => {
  const { t } = useTranslation();
  const { data: collections, isLoading } = useCollectionsList();
  return (
    <>
      <SectionHeader />
      <section className="myCollections">
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="container">
            <div className="row">
              {collections && collections?.length > 0 ? (
                collections?.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))
              ) : (
                <EmptyData>{t("collectionsEmpty")}</EmptyData>
              )}
              {collections?.count > 10 && (
                <CustomPagination count={collections?.count} pageSize={10} />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MyCollections;
