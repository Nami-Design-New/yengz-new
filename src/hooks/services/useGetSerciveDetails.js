import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getServiceDetails } from "../../services/apiServices";

function useServiceDetails() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceDetails", id],
    queryFn: () => getServiceDetails(id),
  });
  return { isLoading, data, error };
}

export default useServiceDetails;
