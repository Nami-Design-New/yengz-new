import { useQuery } from "@tanstack/react-query";
import { getHelpCategories } from "../../services/apiHelp";

export default function useGetHelpCategories() {
  return useQuery({
    queryKey: ["help-categories"],
    queryFn: getHelpCategories,
  });

}
