import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDevelopmentsInCart } from "../../services/apiCart";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateReduxCartFromQuery } from "../../utils/cartHelpers";

/**
 * Hook for updating developments in a cart item
 * @returns {Object} Mutation object with mutate function and loading state
 */
export default function useUpdateCartDevelopments() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: updateDevelopments, isPending: isUpdatingDevelopments } =
    useMutation({
      mutationFn: (data) => updateDevelopmentsInCart(data, queryClient),
      onSuccess: () => {
        // Update Redux cart state from the latest query data
        updateReduxCartFromQuery(queryClient, dispatch);
      },
      onError: (error) => {
        toast.error(error.message || t("common.somethingWentWrong"));
      },
    });

  return { updateDevelopments, isUpdatingDevelopments };
}
