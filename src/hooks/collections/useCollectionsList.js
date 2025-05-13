import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../../services/apiCollections";

function useCollectionsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["collectionsList"],
    queryFn: () => getCollections(),
  });

  return { isLoading, data, error };
}

export default useCollectionsList;
