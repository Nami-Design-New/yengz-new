import { useQuery } from "@tanstack/react-query";
import { getUserServices } from "../../services/ApiServices";

export default function useUserServices(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userServices", id],
    queryFn: () => getUserServices(id),
  });
  return { isLoading, data, error };
}
