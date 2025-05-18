import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartApi } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateReduxCartFromQuery } from "../../utils/cartHelpers";

/**
 * Hook for adding items to cart
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useAddToCart() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: (cartData) => addToCartApi(cartData, queryClient),
    onSuccess: () => {
      toast.success(t("cart.addToCartSuccess"));

      // Update Redux cart state from the latest query data
      updateReduxCartFromQuery(queryClient, dispatch);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { addToCart, isAddingToCart };
}
