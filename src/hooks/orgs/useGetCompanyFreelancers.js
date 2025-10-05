import { useQuery } from "@tanstack/react-query";
import { getCompanyFreelancers } from "../../services/apiOrgsDetails";

function useGetCompanyFreelancers(filters) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyFreelancers", filters],
    queryFn: () => getCompanyFreelancers(filters),
  });

  return { isLoading, data, error };
}

export default useGetCompanyFreelancers;
