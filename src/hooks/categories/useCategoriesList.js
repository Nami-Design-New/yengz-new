import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories";

function useCategoriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryList"],
    queryFn: getCategories,
  });

  return { isLoading, data, error };
}

export default useCategoriesList;
