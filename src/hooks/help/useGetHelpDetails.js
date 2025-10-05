import { useQuery } from "@tanstack/react-query";
import { getHelpDetails } from "../../services/apiHelp";

export default function useGetHelpDetails(slug) {
  return useQuery({
    queryKey: ["helpDetails", slug], 
    queryFn: () => getHelpDetails(slug),
    enabled: !!slug, 
  });
}
