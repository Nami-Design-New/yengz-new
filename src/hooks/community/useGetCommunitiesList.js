import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetCommunitiesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["communitiesList"],
    queryFn: async function getCommunities() {
      try {
        const req = await axiosInstance.get("/get_community_categories");
        return req.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { isLoading, data, error };
}

export default useGetCommunitiesList;
