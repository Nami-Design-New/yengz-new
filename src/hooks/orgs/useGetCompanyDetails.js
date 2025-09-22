import { useQuery } from "@tanstack/react-query";
import { getCompanyDetails } from "../../services/apiOrgs";

function useGetCompanyDetails(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["useOrgsApp", userName],
    queryFn: () => getCompanyDetails(userName),
  });

  return { isLoading, data, error };
}

export default useGetCompanyDetails;


