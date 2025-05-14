import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { deleteWork as apiDeleteWork } from "../../services/apiWorks";

export const useDeleteWork = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mtate: deleteWork, isPending } = useMutation({
    mutationFn: (id) => apiDeleteWork(id),
    onSuccess: () => {
      toast.success(t("profile.workDeletedSuccessfully"));
      queryClient.invalidateQueries(["userWorks"]);
    },
    onError: () => {
      toast.error(t("profile.errorDeletingWork"));
    },
  });

  return { deleteWork, isPending };
};
