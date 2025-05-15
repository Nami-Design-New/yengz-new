import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getServiceOrders } from "../../services/apiOrders";

function useServiceOrdersList(refetchPage) {
  const [searchParams] = useSearchParams();
  const status =
    searchParams.get("status") && searchParams.get("status").split("-");
  const page = refetchPage
    ? refetchPage
    : Number(searchParams.get("page")) || 1;

  const { isLoading, data, refetch, error } = useQuery({
    queryKey: ["serviceOrdersList", status, page],
    queryFn: () => getServiceOrders({ page, status }),
  });

  return { isLoading, refetch, data, error };
}

export default useServiceOrdersList;
