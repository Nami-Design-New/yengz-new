import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAuthedUser(enabled, id) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post(`/get_profile?id=${id}`);
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }
    },
    enabled,
  });
  return { isLoading, data, error, refetch, isFetched };
}
