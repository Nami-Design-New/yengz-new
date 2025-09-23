import { useQuery } from "@tanstack/react-query";
import { getCompanyChats } from "../../services/apiOrgs";

function useGetCompanyChats(userName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["companyChat", userName],
    queryFn: () => getCompanyChats(userName),
  });

  return { isLoading, data, error };
}

export default useGetCompanyChats;
