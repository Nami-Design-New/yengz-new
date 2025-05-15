import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { addCertificate } from "../../services/apiCertificate";
import { toast } from "sonner";

export const useAddCertificate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: addCertificateMutation, isPending: isAddingCertificate } =
    useMutation({
      mutationFn: (data) => addCertificate(data),
      onSuccess: () => {
        toast.success(t("profile.certificateAddedSuccessfully"));
        queryClient.invalidateQueries(["userCertificates"]);
      },
    });

  return { addCertificateMutation, isAddingCertificate };
};
