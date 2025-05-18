import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../../services/apiBanks";

function useBanksList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["banksList"],
    queryFn: () => getBanks(),
  });

  return { isLoading, data, error };
}

export default useBanksList;
