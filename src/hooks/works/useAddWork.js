import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { addWork as apiAddWork } from "../../services/apiWorks";

export const useAddWork = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: addWork, isPending } = useMutation({
    mutationFn: (data) => apiAddWork(data, queryClient),
    onSuccess: () => {
      toast.success(t("profile.workAddedSuccessfully"));
      queryClient.invalidateQueries(["userWorks"]);
    },
    onError: (error) => {
      toast.error(t("profile.errorAddingWork"));
      console.error("Add work error:", error);
    },
  });

  return { addWork, isPending };
};
