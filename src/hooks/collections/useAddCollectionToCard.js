import React from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollectionToCart as apiAddCollectionToCart } from "../../services/apiCollections";
import { useNavigate } from "react-router";

const useAddCollectionToCard = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addCollectionToCart, isPending: isAdding } = useMutation({
    mutationFn: (cartData) => apiAddCollectionToCart(cartData),
    onSuccess: () => {
      toast.success(t("cart.addToCartSuccess"));
      navigate("/cart");
      queryClient.invalidateQueries(["cartList"]);
    },
    onError: (error) => {
      toast.error(error.message || t("common.somethingWentWrong"));
    },
  });
  return { addCollectionToCart, isAdding };
};

export default useAddCollectionToCard;
