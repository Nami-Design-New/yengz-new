import { useQuery } from "@tanstack/react-query";
import { getCompanyPayments } from "../../services/apiOrgs";

function useGetCompanyPayments(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyPayments", userName],
    queryFn: () => getCompanyPayments(userName),
  });

  return { isLoading, data, error };
}

export default useGetCompanyPayments;
