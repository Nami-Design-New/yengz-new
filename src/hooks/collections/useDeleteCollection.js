import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { removeCollection as apiRemoveCollection } from "../../services/apiCollections";

/**
 * Hook for deleting a collection of items from the cart
 **/
const useDeleteCollection = () => {
  const querClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: removeCollection, isPending } = useMutation({
    mutationFn: (id) => apiRemoveCollection(id),
    onSuccess: () => {
      querClient.invalidateQueries(["collectionsList"]);
      toast.success(t("cart.collectionDeletedSuccessfully"));
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.message);
    },
  });

  return { removeCollection, isPending };
};

export default useDeleteCollection;
