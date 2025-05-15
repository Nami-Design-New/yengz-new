import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { updateWork as apiUpdateWork } from "../../services/apiWorks";

export const useUpdateWork = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: updateWork, isPending } = useMutation({
    mutationFn: (data) => apiUpdateWork(data, queryClient),
    onSuccess: () => {
      toast.success(t("profile.workUpdatedSuccessfully"));
      queryClient.invalidateQueries(["userWorks"]);
    },
    onError: (error) => {
      toast.error(t("profile.errorUpdatingWork"));
      console.error("Update work error:", error);
    },
  });

  return { updateWork, isPending };
};
