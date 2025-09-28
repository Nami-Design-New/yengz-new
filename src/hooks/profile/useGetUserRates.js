import { useQuery } from "@tanstack/react-query";
import { getUserRates } from "../../services/apiProfile";

function useGetUserRates(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userRates", id],
    queryFn: () => getUserRates(id),
  });

  return { isLoading, data, error };
}

export default useGetUserRates;
