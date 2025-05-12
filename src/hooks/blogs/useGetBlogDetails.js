import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBlogDetails } from "../../services/apiBlogs";

function useBlogDetails() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => getBlogDetails(id),
  });
  return { isLoading, data, error };
}

export default useBlogDetails;
