import { useQuery } from "@tanstack/react-query";
import { getTeamUpdateDetails } from "../../services/apiOrgs";

function useGetTeamUpdateDetails(userName, teamId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["teamUpdateDetails", userName, teamId],
    queryFn: () => getTeamUpdateDetails(userName, teamId),
  });

  return { isLoading, data, error };
}

export default useGetTeamUpdateDetails;
