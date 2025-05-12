import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAboutData } from "../../services/apiAbout";

function useGetAboutData() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["getAboutData", id],
    queryFn: () => getAboutData(id),
  });

  return { isLoading, data, error };
}

export default useGetAboutData;
