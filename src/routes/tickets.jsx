import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useTicketsList from "../hooks/tickets/useTicketsList";
import DataLoader from "../ui/DataLoader";
import AddTicketModal from "../ui/modals/AddTicketModal";
import SectionHeader from "../ui/SectionHeader";

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
                            {tickets?.data?.map((ticket) => (
                                <div className="ticket-card" key={ticket.id}>
                                    <div className="ticket-info">
                                        <p className="ticket-number">
                                            {t("tickets.ticketNumber")}: <span>{ticket.reason_id}</span>
                                        </p>
                                        <p className="ticket-title">{ticket.title}</p>
                                        <p className="ticket-subtitle">{ticket.description}</p>
                                        <p className="ticket-date">{formatDate(ticket.created_at)}</p>
                                    </div>
                                    <button className={`ticket-status ${ticket.status}`}>
                                        {ticket.status_name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <AddTicketModal
                    showModal={showAddTicketModal}
                    setShowModal={setShowAddTicketModal}
                    targetTicket={null}
                    setTargetTicket={() => { }}
                />

            </section>
        </>
    );
};

export default Tickets;
