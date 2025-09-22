import { useQuery } from "@tanstack/react-query";
import { getCompanyCategory } from "../../services/apiOrgs";

function useGetCompanyCategory() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyCategory"],
    queryFn: () => getCompanyCategory(),
  });

  return { isLoading, data, error };
}

export default useGetCompanyCategory;
