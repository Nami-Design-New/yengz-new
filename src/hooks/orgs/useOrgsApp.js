import { useQuery } from "@tanstack/react-query";
import { getOrgs } from "../../services/apiOrgs";

function useGetOrgsApp() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["useOrgsApp"],
    queryFn: () => getOrgs(),
  });

  return { isLoading, data, error };
}

export default useGetOrgsApp;
