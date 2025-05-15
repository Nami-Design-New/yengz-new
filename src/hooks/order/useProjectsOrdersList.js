import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjectsOrders } from "../../services/apiOrders";

function useProjectsOrdersList() {
  const [searchParams] = useSearchParams();
  const status =
    searchParams.get("status") && searchParams.get("status").split("-");
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["projectsOrdersList", status, page],
    queryFn: () => getProjectsOrders({ page, status }),
  });

  return { isLoading, data, error };
}

export default useProjectsOrdersList;
