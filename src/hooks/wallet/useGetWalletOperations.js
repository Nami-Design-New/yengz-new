import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { fetchWalletOperations } from "../../services/apiWallet";

function useGetWalletOperations() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams?.get("status")?.split("-");

  const { isLoading, data, error } = useQuery({
    queryKey: ["wallet-operations", page, status],
    queryFn: () => fetchWalletOperations({ page, status }),
  });

  return { isLoading, data, error };
}

export default useGetWalletOperations;
