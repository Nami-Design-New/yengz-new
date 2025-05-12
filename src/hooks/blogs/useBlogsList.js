import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/apiBlogs";

function useBlogsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["blogsList"],
    queryFn: () => getBlogs(),
  });

  return { isLoading, data, error };
}

export default useBlogsList;
