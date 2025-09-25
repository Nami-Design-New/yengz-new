import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/apiOrgs";

function useGetNotes(userId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getNotes", userId],
    queryFn: () => getNotes(userId),
  });

  return { isLoading, data, error };
}

export default useGetNotes;
