import { useQuery } from "@tanstack/react-query";
import { getCompanyAddMemberTeams } from "../../services/apiOrgs";

function useGetCompanyAddMemberTeams(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["CompanyAddMemberTeams", userName],
    queryFn: () => getCompanyAddMemberTeams(userName),
  });

  return { isLoading, data, error };
}

export default useGetCompanyAddMemberTeams;
