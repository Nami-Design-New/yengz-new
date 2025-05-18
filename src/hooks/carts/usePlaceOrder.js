import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../services/apiOrders";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// Using updateEntireCart directly since we need to clear the cart completely
import { updateEntireCart } from "../../redux/slices/cart";
import { useNavigate } from "react-router";

/**
 * Hook for placing an order from cart items
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function usePlaceOrder() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: placeOrder, isPending: isPlacingOrder } = useMutation({
    mutationFn: () => createOrder(queryClient),
    onSuccess: () => {
      toast.success(t("cart.orderSuccess"));
      // Clear cart in Redux after successful order placement
      dispatch(updateEntireCart([]));
      navigate("/purchases");
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { placeOrder, isPlacingOrder };
}
