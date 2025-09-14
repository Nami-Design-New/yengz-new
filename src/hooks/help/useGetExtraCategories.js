// src/hooks/help/useGetExtraCategories.js
import { useQuery } from "@tanstack/react-query";
import { getExtraCategories } from "../../services/apiSeller";

export default function useGetExtraCategories() {
  return useQuery({
    queryKey: ["extraCategories"],
    queryFn: getExtraCategories,
  });
}
