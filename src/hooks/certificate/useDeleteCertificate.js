import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { deleteCertificate as apiDeleteCertificate } from "../../services/apiCertificate";
import { toast } from "sonner";

const useDeleteCertificate = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate: deleteCertificate, isPending } = useMutation({
    mutationFn: (id) => apiDeleteCertificate(id),
    onSuccess: () => {
      toast.success(t("profile.certificateDeletedSuccessfully"));
      queryClient.invalidateQueries(["userCertificates"]);
    },
  });

  return { deleteCertificate, isPending };
};

export default useDeleteCertificate;
