import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart as deleteCartApi } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// Replace updateEntireCart import with the utility function
import { updateEntireCart } from "../../redux/slices/cart";

/**
 * Hook for deleting the entire cart
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useDeleteCart() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: deleteCart, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCartApi(queryClient),
    onSuccess: () => {
      toast.success(t("cart.cartDelted"));

      // Clear cart in Redux after successful deletion
      dispatch(updateEntireCart([]));
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { deleteCart, isDeleting };
}
