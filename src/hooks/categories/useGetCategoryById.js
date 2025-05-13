import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategories";

function useGetCategoryById(id) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });

  return { isLoading, data, error };
}

export default useGetCategoryById;
