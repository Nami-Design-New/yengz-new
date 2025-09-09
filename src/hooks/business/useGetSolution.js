import { useQuery } from "@tanstack/react-query";
import { getSolution } from "../../services/apiBusinessSolutions";
import { useParams } from "react-router";

function useGetSolution() {
  const params = useParams();
  const slug = params.slug;

  const { isLoading, data, error } = useQuery({
    queryKey: ["business-solution", slug],
    queryFn: () => getSolution(slug),
    enabled: !!slug,
  });
  return { isLoading, data, error };
}

export default useGetSolution;
