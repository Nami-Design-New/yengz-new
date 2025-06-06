import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";

const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrder(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries("order");
      queryClient.invalidateQueries("serviceOrdersList");
      queryClient.invalidateQueries("purchasesList");
    },
    onError: (error) => {
      console.error("Failed to update order:", error.message);
    },
  });
};

export default useUpdateOrder;
