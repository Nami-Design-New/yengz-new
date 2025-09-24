import { useQuery } from "@tanstack/react-query";
import { getCompanyTeamProjects } from "../../services/apiOrgs";

function useGetCompanyTeamProjects() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyTeamProjects"],
    queryFn: () => getCompanyTeamProjects(),
  });

  return { isLoading, data, error };
}

export default useGetCompanyTeamProjects;
