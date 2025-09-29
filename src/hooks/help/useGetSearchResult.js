import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "../../services/apiHelp";

export default function useGetSearchResult(search) {
  return useQuery({
    queryKey: ["searchResult", search],
    queryFn: () => getSearchResult(search),
    enabled: !!search,
  });
}
