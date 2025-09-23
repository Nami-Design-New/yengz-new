import { useQuery } from "@tanstack/react-query";
import { getCompanyFreelancers } from "../../services/apiOrgs";

function useGetCompanyFreelancers(userName, search) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyFreelancers", userName, search],
    queryFn: () => getCompanyFreelancers(userName, search),
  });

  return { isLoading, data, error };
}

export default useGetCompanyFreelancers;
