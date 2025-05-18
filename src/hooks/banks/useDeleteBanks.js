import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteBank as apiDeleteBank } from "../../services/apiBanks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const useDeleteBanks = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: deleteBank, isPending } = useMutation({
    mutationFn: (id) => apiDeleteBank(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banksList"] });
      toast.success(t("manageAccounts.bankDeletedSuccessfully"));
    },
    onError: (error) => {
      toast.error(t("manageAccounts.somethingWentWrong"));
      toast.error(error?.message);
    },
  });
  return {
    isPending,
    deleteBank,
  };
};

export default useDeleteBanks;
