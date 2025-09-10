import * as yup from "yup";

export const ticketSchema = (t) =>
  yup.object().shape({
    title: yup.string().required(t("tickets.titleRequired")),
    ticket_category_id: yup.string().required(t("tickets.ticketCategoryRequired")),
    important: yup.string().required(t("tickets.importanceRequired")),
    description: yup.string().required(t("tickets.descriptionRequired")),
    ticket_number: yup.string().nullable(),
  });
