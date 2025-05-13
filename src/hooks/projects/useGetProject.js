import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProjectById } from "../../services/apiProjects";

export default function useGetProject() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });
  return { isLoading, data, error };
}
