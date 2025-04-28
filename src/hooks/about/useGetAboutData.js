import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function useGetAboutData() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["getAboutData", id],
    queryFn: async function () {
      try {
        const req = await axiosInstance.post("/get_about_app_data", { id });
        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetAboutData;
