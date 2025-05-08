import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "../../services/apiPaymentsMethods";

function useGetPaymentMethods() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["paymentMethodsList"],
    queryFn: getPaymentMethods,
  });

  return { isLoading, data, error };
}

export default useGetPaymentMethods;
