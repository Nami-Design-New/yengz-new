import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetCommunityPostDetails(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communityPostDetails", id],
    queryFn: async function (id) {
      try {
        const req = await axiosInstance.post("/get_community_post_details", {
          id: id,
        });
        return req.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return { isLoading, data, error };
}

export default useGetCommunityPostDetails;
