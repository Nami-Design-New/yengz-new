import { useQuery } from "@tanstack/react-query";
import { getCompanyTeamNotes } from "../../services/apiOrgs";

function useGetCompanyTeamNotes() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyTeamNotes"],
    queryFn: () => getCompanyTeamNotes(),
  });

  return { isLoading, data, error };
}

export default useGetCompanyTeamNotes;
