import { useQuery } from "@tanstack/react-query";
import { getCompanyDetailsSimple } from "../../services/apiOrgs";

function useGetCompanyDetailsSimple(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyDetailsSimple", userName],
    queryFn: () => getCompanyDetailsSimple(userName),
  });

  return { isLoading, data, error };
}
 

export default useGetCompanyDetailsSimple;



