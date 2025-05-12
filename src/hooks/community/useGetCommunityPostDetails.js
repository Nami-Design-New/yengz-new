import { useQuery } from "@tanstack/react-query";
import { getCommunityPostDetails } from "../../services/apiCommunities";

function useGetCommunityPostDetails(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communityPostDetails", id],
    queryFn: () => getCommunityPostDetails(id),
  });
  return { isLoading, data, error };
}

export default useGetCommunityPostDetails;
