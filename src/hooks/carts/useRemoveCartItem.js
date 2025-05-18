import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateReduxCartFromQuery } from "../../utils/cartHelpers";

/**
 * Hook for removing an item from cart
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (id) => deleteCartItem(id, queryClient),
    onSuccess: () => {
      toast.success(t("cart.deleteSuccess"));
      // Update Redux cart state from the latest query data
      updateReduxCartFromQuery(queryClient, dispatch);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { removeItem, isRemoving };
}
