import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../../services/apiFaqs";

export default function useGetFaqs() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });

  return { isLoading, data, error };
}
