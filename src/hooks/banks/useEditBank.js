import { useMutation } from "@tanstack/react-query";
import React from "react";
import { editBank as apiEditBank } from "../../services/apiBanks";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const useEditBank = () => {
  const { t } = useTranslation();

  const { mutate: editBank, isPending } = useMutation({
    mutationFn: (data) => apiEditBank(data),
    onSuccess: () => {
      toast.success(t("manageAccounts.bankUpdatedSuccessfully"));
    },
    onError: (error) => {
      toast.error(t("manageAccounts.somethingWentWrong"));
      toast.error(error?.message);
    },
  });

  return { editBank, isPending };
};

export default useEditBank;
