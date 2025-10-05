import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService as apiDeleteService } from "../../services/ApiServices";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useDeleteService = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: deleteService, isPending } = useMutation({
    mutationFn: (id) => apiDeleteService(id),
    onSuccess: () => {
      toast.success(t("addService.serviceDeleted"));
      queryClient.invalidateQueries("userServices");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteService,
    isPending,
  };
};
