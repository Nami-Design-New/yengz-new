import { useQuery } from "@tanstack/react-query";
import { getWorks } from "../../services/apiWorks";

export default function useGetWorks(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userWorks", id],
    queryFn: () => getWorks(id),
  });
  return { isLoading, data, error };
}
