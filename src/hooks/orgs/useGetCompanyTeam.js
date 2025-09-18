import { useQuery } from "@tanstack/react-query";
import { getCompanyTeam } from "../../services/apiOrgs";

function useGetCompanyTeam(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyTeam", userName],
    queryFn: () => getCompanyTeam(userName),
  });

  return { isLoading, data, error };
}

export default useGetCompanyTeam;
