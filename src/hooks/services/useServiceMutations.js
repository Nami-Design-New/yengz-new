import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { createService, updateService } from "../../services/apiServices";

/**
 * Custom hook for service mutations (create and update)
 * @returns {Object} Mutation functions and states
 */
const useServiceMutations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: (data) => createService(data, queryClient),
    onSuccess: () => {
      toast.success(t("addService.success"));
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: (data) => updateService(data, queryClient),
    onSuccess: () => {
      toast.success(t("addService.updateSuccess"));
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createService: createMutation.mutate,
    updateService: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
};

export default useServiceMutations;
