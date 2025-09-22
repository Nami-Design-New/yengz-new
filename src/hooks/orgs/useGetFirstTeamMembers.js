import { useQuery } from "@tanstack/react-query";
import { getFirstTeamMembers } from "../../services/apiOrgs";

function useGetFirstTeamMembers(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["FirstTeamMembers", userName],
    queryFn: () => getFirstTeamMembers(userName),
  });

  return { isLoading, data, error };
}

export default useGetFirstTeamMembers;
