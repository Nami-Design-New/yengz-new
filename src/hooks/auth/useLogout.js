import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { logoutAction } from "../../redux/slices/authedUser";
import { logoutUser } from "../../services/apiAuth";
import axiosInstance from "../../utils/axiosInstance";

/**
 * Custom hook for handling user logout functionality
 * @returns {Object} - The mutation object with logout function
 */
const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [cookies, , deleteCookie] = useCookies(["token", "id"]);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutUser(cookies?.token),
    onSuccess: (response) => {
      if (response.data.code === 200) {
        // Clear cookies
        deleteCookie("token");
        deleteCookie("id");

        // Clear authorization header
        delete axiosInstance.defaults.headers.common["Authorization"];

        // Reset user state
        dispatch(logoutAction());

        // Clear React Query cache
        queryClient.clear();

        // Clear session storage
        sessionStorage.clear();

        // Navigate to home page
        navigate("/");

        // Show success message
        toast.success(t("navbar.logoutSuccess"));
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error(t("navbar.logoutError"));
    },
  });

  return { logout, isPending };
};

export default useLogout;
