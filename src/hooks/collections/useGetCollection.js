import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/apiCollections";

function useGetCollection(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollection(id),
  });

  return { isLoading, data, error };
}

export default useGetCollection;
