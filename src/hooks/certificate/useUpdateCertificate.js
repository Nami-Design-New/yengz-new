import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateCertificate } from "../../services/apiCertificate";
import { toast } from "sonner";

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutate: updateCertificateMutation,
    isPending: isUpdatingCertificate,
  } = useMutation({
    mutationFn: (data) => updateCertificate(data),
    onSuccess: () => {
      toast.success(t("profile.certificateUpdatedSuccessfully"));
      queryClient.invalidateQueries(["userCertificates"]);
    },
  });

  return { updateCertificateMutation, isUpdatingCertificate };
};
