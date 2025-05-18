import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { addBank as apiAddBank } from "../../services/apiBanks";

const useEditBank = () => {
  const { t } = useTranslation();

  const { mutate: addBank, isPending } = useMutation({
    mutationFn: (data) => apiAddBank(data),
    onSuccess: () => {
      toast.success(t("manageAccounts.bankAddedSuccessfully"));
    },
    onError: (error) => {
      toast.error(t("manageAccounts.somethingWentWrong"));
      toast.error(error?.message);
    },
  });

  return { addBank, isPending };
};

export default useEditBank;
