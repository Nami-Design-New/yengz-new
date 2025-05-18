import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseCartQuantity } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateReduxCartFromQuery } from "../../utils/cartHelpers";

/**
 * Hook for increasing cart item quantity
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useIncreaseCartQuantity() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: increaseQuantity, isPending: isIncreasing } = useMutation({
    mutationFn: (id) => increaseCartQuantity(id, queryClient),
    onSuccess: () => {
      // Update Redux cart state from the latest query data
      updateReduxCartFromQuery(queryClient, dispatch);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { increaseQuantity, isIncreasing };
}
