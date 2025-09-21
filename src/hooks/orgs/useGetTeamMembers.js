import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../../services/apiOrgs";

function useGetTeamMembers(userName, teamId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["teamMembers", userName , teamId],
    queryFn: () => getTeamMembers(userName , teamId),
  });

  return { isLoading, data, error };
}

export default useGetTeamMembers;
