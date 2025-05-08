import { useQuery } from "@tanstack/react-query";
import { getAbout } from "../../services/apiAbout";

export default function useGetAbout() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAbout"],
    queryFn: getAbout,
  });

  return { isLoading, data, error };
}
