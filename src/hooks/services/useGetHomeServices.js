import { useQuery } from "@tanstack/react-query";
import { getHomeServices } from "../../services/ApiServices";

export default function useGetHomeServices() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["homeServices"],
    queryFn: getHomeServices,
  });
  return { isLoading, data, error };
}
