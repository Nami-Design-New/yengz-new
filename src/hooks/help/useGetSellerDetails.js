
// src/hooks/help/useGetSellerDetails.js
import { useQuery } from "@tanstack/react-query";
import { getSellerDetails } from "../../services/apiSeller";

export default function useGetSellerDetails(slug) {
  return useQuery({
    queryKey: ["sellerDetails", slug],
    queryFn: () => getSellerDetails(slug),
    enabled: !!slug,
  });
}
