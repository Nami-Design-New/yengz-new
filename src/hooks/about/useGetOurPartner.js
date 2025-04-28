import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOurPartner() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getOurPartner"],
    queryFn: async function getOurPartner() {
      try {
        const req = await axiosInstance.get("/get_partners");
        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });

  return { isLoading, data, error };
}
