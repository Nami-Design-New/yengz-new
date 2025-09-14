import React from "react";
import { useTranslation } from "react-i18next";

const TicketCard = ({ ticket, formatDate }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default TicketCard;
