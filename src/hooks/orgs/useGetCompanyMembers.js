import { useQuery } from "@tanstack/react-query";
import { getCompanyMembers } from "../../services/apiOrgs";

function useGetCompanyMembers(userName, search, last_login, verified) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyMembers", userName, search, last_login, verified],
    queryFn: () => getCompanyMembers(userName, search, last_login, verified),
  });

  return { isLoading, data, error };
}

export default useGetCompanyMembers;
