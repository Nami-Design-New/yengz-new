import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createProject, editProject } from "../../services/apiProjects";

/**
 * Custom hook for project mutations (create and update)
 * @returns {Object} Mutation functions and states
 */
const useProjectMutations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create Project mutation
  const createMutation = useMutation({
    mutationFn: (data) => createProject(data, queryClient),
    onSuccess: () => {
      toast.success(t("projects.projectCreatedSuccessfully"));
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update Project mutation
  const updateMutation = useMutation({
    mutationFn: (data) => editProject(data, queryClient),
    onSuccess: () => {
      toast.success(t("projects.projectEditedSuccessfully"));
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createProject: createMutation.mutate,
    updateProject: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
};

export default useProjectMutations;
