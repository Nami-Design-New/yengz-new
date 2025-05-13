import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getComments } from "../../services/apiComments";

function useGetComments() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["serviceComments", id],
    queryFn: () => getComments(id),
  });
  return { isLoading, data, error };
}

export default useGetComments;
