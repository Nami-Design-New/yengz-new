import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateCollection as apiUpdateCollection } from "../../services/apiCollections";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const useUpdateCollection = () => {
  const { t } = useTranslation();
  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: (data) => apiUpdateCollection(data),
    onSuccess: () => {
      toast.success(t("cart.collectionUpdated"));
    },
  });

  return { updateCollection, isUpdating };
};

export default useUpdateCollection;
