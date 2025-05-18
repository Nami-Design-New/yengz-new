import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteCartItem,
  updateDevelopmentsInCart,
} from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateEntireCart } from "../../redux/slices/cart";

/**
 * Hook for cart item operations (increase, decrease, delete, update developments)
 * @returns {Object} Mutation objects for different cart operations
 */
export default function useCartItemOperations() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Helper function to update Redux cart state after mutations
  const updateReduxCart = () => {
    const cartData = queryClient.getQueryData(["cartList"]);
    if (cartData?.data) {
      dispatch(
        updateEntireCart(
          cartData.data.map((item) => ({
            id: item.id,
            service_id: item.service?.id,
            quantity: item.quantity,
            developments: item.service?.developments
              ?.filter((dev) => dev.in_cart !== false)
              .map((dev) => dev.id),
          }))
        )
      );
    } else {
      // If cart is empty, update Redux with empty array
      dispatch(updateEntireCart([]));
    }
  };

  // Increase cart item quantity
  const { mutate: increaseQuantity, isPending: isIncreasing } = useMutation({
    mutationFn: (id) => increaseCartQuantity(id, queryClient),
    onSuccess: () => {
      updateReduxCart();
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  // Decrease cart item quantity
  const { mutate: decreaseQuantity, isPending: isDecreasing } = useMutation({
    mutationFn: (id) => decreaseCartQuantity(id, queryClient),
    onSuccess: () => {
      updateReduxCart();
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  // Delete cart item
  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (id) => deleteCartItem(id, queryClient),
    onSuccess: () => {
      toast.success(t("cart.deleteSuccess"));
      updateReduxCart();
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  // Update developments in cart
  const { mutate: updateDevelopments, isPending: isUpdatingDevelopments } =
    useMutation({
      mutationFn: (data) => updateDevelopmentsInCart(data, queryClient),
      onSuccess: () => {
        updateReduxCart();
      },
      onError: (error) => {
        toast.error(error.message || t("common.somethingWentWrong"));
      },
    });

  return {
    increaseQuantity,
    isIncreasing,
    decreaseQuantity,
    isDecreasing,
    removeItem,
    isRemoving,
    updateDevelopments,
    isUpdatingDevelopments,
  };
}
