import { useQuery } from "@tanstack/react-query";
import { getParteners } from "../../services/apiParteners";

function usePartenersList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["partenersList"],
    queryFn: getParteners,
  });
  return { isLoading, data, error };
}

export default usePartenersList;
