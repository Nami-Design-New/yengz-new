import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decreaseCartQuantity } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateReduxCartFromQuery } from "../../utils/cartHelpers";

/**
 * Hook for decreasing cart item quantity
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useDecreaseCartQuantity() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: decreaseQuantity, isPending: isDecreasing } = useMutation({
    mutationFn: (id) => decreaseCartQuantity(id, queryClient),
    onSuccess: () => {
      // Update Redux cart state from the latest query data
      updateReduxCartFromQuery(queryClient, dispatch);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { decreaseQuantity, isDecreasing };
}
