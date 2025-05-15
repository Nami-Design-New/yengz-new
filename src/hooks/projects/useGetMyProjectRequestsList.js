import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getMyProjectRequests } from "../../services/apiProjects";

function useGetMyProjectRequestsList() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const { isLoading, data, error } = useQuery({
    queryKey: ["myProjectRequests", sort],
    queryFn: () => getMyProjectRequests(sort),
  });
  return { isLoading, data, error };
}

export default useGetMyProjectRequestsList;
