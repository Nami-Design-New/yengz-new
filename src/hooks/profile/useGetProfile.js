import { useQuery } from "@tanstack/react-query";
import getProfile from "../../services/apiProfile";

export default function useGetProfile(id, enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    enabled,
  });
  return { isLoading, data, error, refetch, isFetched };
}
