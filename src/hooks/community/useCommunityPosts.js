import { useQuery } from "@tanstack/react-query";
import { getCommunityPosts } from "../../services/apiCommunities";

function useCommunityPosts(name) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communityPosts", name],
    queryFn: () => getCommunityPosts(name),
  });
  return { isLoading, data, error };
}

export default useCommunityPosts;
