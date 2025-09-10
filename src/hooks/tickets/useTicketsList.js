import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/apiTickets";

function useTicketsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["ticketsList"], 
    queryFn: getTickets,       
  });

  return { isLoading, data, error };
}

export default useTicketsList;
