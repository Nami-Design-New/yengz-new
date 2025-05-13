import { useQuery } from "@tanstack/react-query";
import { getProjectRequests } from "../../services/apiProjects";

export default function useGetProjectRequests(id, type) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["projectRequests", id, type],
    queryFn: () => getProjectRequests(id, type),
  });
  return { isLoading, data, error };
}
