import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAbout() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAbout"],
    queryFn: async function () {
      try {
        const req = await axiosInstance.get("/get_about_app");
        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });

  return { isLoading, data, error };
}
