import { useQuery } from "@tanstack/react-query";
import { getProjectHelper } from "../../services/apiProjects";


export default function useGetTemplateHelpers() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["template-helpers"],
    queryFn: () => getProjectHelper(),
  });
  return { isLoading, data, error };
}
