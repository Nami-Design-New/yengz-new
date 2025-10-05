import { useQuery } from "@tanstack/react-query";
import { getCompanyPayments } from "../../services/apiOrgsDetails";

function useGetCompanyPayments(filters) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyPayments", filters],
    queryFn: () => getCompanyPayments(filters),
  });

  return { isLoading, data, error };
}

export default useGetCompanyPayments;
