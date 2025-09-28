import { useQuery } from "@tanstack/react-query";
import { getTicketsCategory } from "../../services/apiTickets";

function useGetTicketsCategory() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["ticketsCategory"],
    queryFn: getTicketsCategory,
  });

  return { isLoading, data, error };
}

export default useGetTicketsCategory;
