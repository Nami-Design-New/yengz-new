import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useTicketsList from "../hooks/tickets/useTicketsList";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import AddTicketModal from "../ui/modals/AddTicketModal";
import SectionHeader from "../ui/SectionHeader";
import TicketCard from "../ui/cards/TicketCard";

const Tickets = () => {
  const { t } = useTranslation();
  const { isLoading, data: tickets } = useTicketsList();
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.slice(0, 10).split("-").reverse().join("/");
  };

  return (
    <>
      <SectionHeader />
      <section className="tickets-page">
        <div className="container">
          <div className="tickets-header">
            <h3 className="page-title">{t("tickets.header")}</h3>
            <button
              className="add-ticket-btn"
              onClick={() => setShowAddTicketModal(true)}
            >
              <i className="fa-solid fa-plus"></i> {t("tickets.addTicket")}
            </button>
          </div>

          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="tickets-list">
              {tickets?.data?.length > 0 ? (
                tickets.data.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    formatDate={formatDate}
                  />
                ))
              ) : (
                <EmptyData>{t("tickets.empty")}</EmptyData>
              )}
            </div>
          )}
        </div>

        <AddTicketModal
          showModal={showAddTicketModal}
          setShowModal={setShowAddTicketModal}
          targetTicket={null}
          setTargetTicket={() => {}}
        />
      </section>
    </>
  );
};

export default Tickets;
