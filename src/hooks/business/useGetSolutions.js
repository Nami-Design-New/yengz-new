import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../../services/apiBusinessSolutions";

function useGetSolutions() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["business-solutions"],
    queryFn: () => getSolutions(),
  });
  return { isLoading, data, error };
}

export default useGetSolutions;
