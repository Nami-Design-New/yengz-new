import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetNotifications() {
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  const { isLoading, data, error } = useQuery({
    queryKey: ["notifications", token],

    queryFn: async function () {
      try {
        const req = await axiosInstance.post("/get_notifications");
        return req?.data?.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });
  return { isLoading, data, error };
}
