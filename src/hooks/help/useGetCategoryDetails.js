import { useQuery } from "@tanstack/react-query";
import { getHelpCategoryDetails } from "../../services/apiHelp";

export default function useGetCategoryDetails(slug) {
  return useQuery({
    queryKey: ["category", slug], 
    queryFn: () => getHelpCategoryDetails(slug),
    enabled: !!slug, 
  });
}
