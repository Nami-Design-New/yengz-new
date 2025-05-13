import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/apiCart";

function useCartList() {
  const { isLoading, refetch, data, error } = useQuery({
    queryKey: ["cartList"],
    queryFn: () => getCart(),
  });

  return { isLoading, refetch, data, error };
}

export default useCartList;
