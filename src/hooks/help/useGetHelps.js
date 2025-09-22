import { useQuery } from "@tanstack/react-query";
import { getPopularHelps } from "../../services/apiHelp";

export default function useGetHelps() {
  return useQuery({
    queryKey: ["helps"],
    queryFn: getPopularHelps, 
  });
}
