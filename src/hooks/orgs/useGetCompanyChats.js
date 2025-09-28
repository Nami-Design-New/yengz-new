import { useQuery } from "@tanstack/react-query";
import { getCompanyChats } from "../../services/apiOrgsDetails";

function useGetCompanyChats(filters) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyChats", filters],
    queryFn: () => getCompanyChats(filters),
  });

  return { isLoading, data, error };
}

export default useGetCompanyChats;
