import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteProject as deleteProjectApi } from "../../services/apiProjects";
import { toast } from "sonner";

/**
 * Custom hook for handling project deletion functionality
 * @returns {Object} - The mutation object with deleteProject function and loading state
 */
export default function useDeleteProject() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: (projectId) => deleteProjectApi(projectId, queryClient),
    onSuccess: () => {
      toast.success(t("projects.projectDeleted"));
    },
    onError: (error) => {
      console.error("Error during project deletion:", error);
      toast.error(t("projects.deleteError", "Failed to delete project"));
    },
  });

  return {
    deleteProject,
    isPending,
  };
}
