import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdraw } from "../../services/apiBanks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

/**
 * Custom hook for handling withdraw balance requests
 * @returns {Object} Mutation function and loading state
 */
const useWithdraw = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: withdraw, isPending } = useMutation({
    mutationFn: (data) => createWithdraw(data),
    onSuccess: () => {
      toast.success(t("balance.withdrawSuccessfully"));
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });

  return { withdraw, isPending };
};

export default useWithdraw;
