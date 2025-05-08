import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAboutCategory } from "../../services/apiAbout";

function useGetAboutAppCategory() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["useGetAboutAppCategory", id],
    queryFn: () => getAboutCategory(id),
  });

  return { isLoading, data, error };
}

export default useGetAboutAppCategory;
