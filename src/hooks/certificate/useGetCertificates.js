import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../../services/apiCertificate";

export default function useGetCertificates(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userCertificates", id],
    queryFn: () => getCertificates(id),
  });
  return { isLoading, data, error };
}
