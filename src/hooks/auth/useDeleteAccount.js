import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutAction } from "../../redux/slices/authedUser";
import { deleteAccount as deleteAccountApi } from "../../services/apiAuth";
import axiosInstance from "../../utils/axiosInstance";

/**
 * Custom hook for handling user account deletion functionality
 * @returns {Object} - The mutation object with deleteAccount function and loading state
 */
export default function useDeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [, , deleteCookie] = useCookies(["token", "id"]);

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => {
      // Clear authorization header
      delete axiosInstance.defaults.headers.common["Authorization"];

      // Clear cookies
      deleteCookie("token");
      deleteCookie("id");

      // Reset user state
      dispatch(logoutAction());

      // Clear session storage and React Query cache
      sessionStorage.clear();
      queryClient.clear();

      // Navigate to home page
      navigate("/");

      // Show success message
      toast.success(t("account.deleteSuccess", "Account successfully deleted"));
    },
    onError: (error) => {
      console.error("Error during account deletion:", error);
      toast.error(t("account.deleteError", "Failed to delete account"));
    },
  });

  return {
    deleteAccount,
    isPending,
  };
}
