import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../../services/apiProjects";

export default function useGetUserProjects(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userProjects", id],
    queryFn: () => getUserProjects(id),
  });
  return { isLoading, data, error };
}
