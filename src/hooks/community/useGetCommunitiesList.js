import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../../services/apiCommunities";

function useGetCommunitiesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communitiesList"],
    queryFn: () => getCommunities(),
  });

  return { isLoading, data, error };
}

export default useGetCommunitiesList;
