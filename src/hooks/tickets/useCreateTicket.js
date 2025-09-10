// hooks/tickets/useCreateTicket.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { addTicket as apiAddTicket } from "../../services/apiTickets";

export const useCreateTicket = () => {
  const { t } = useTranslation();

  const { mutate: createTicket, isPending } = useMutation({
    mutationFn: (data) => apiAddTicket(data),
    onSuccess: () => {
      toast.success(t("tickets.ticketAddedSuccessfully"));
    },
    onError: (error) => {
      toast.error(t("tickets.somethingWentWrong"));
      if (error?.message) toast.error(error.message);
    },
  });

  return { createTicket, isLoading: isPending };
};
