import { useQuery } from "@tanstack/react-query";
import getSettings from "../../services/apiSettings";

export default function useGetSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, data, error };
}
