import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { setUser } from "../../redux/slices/authedUser";
import { confirmOtp, loginUser } from "../../services/apiAuth";
import { useTranslation } from "react-i18next";

// Custom hook to handle OTP confirmation and subsequent login
const useConfirmOtp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token", "id"]);

  // Handle successful login by setting user data and cookies
  const handleLoginSuccess = (loginData) => {
    // Update Redux store with user data
    dispatch(setUser(loginData.data));

    // Set authentication cookies with secure options
    setCookie("token", loginData.data.token, {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
    setCookie("id", loginData.data.id, {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });

    // Redirect to home page after successful login
    navigate("/");
  };

  // Mutation for handling login after OTP confirmation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.code === 200) {
        handleLoginSuccess(data);
      } else {
        toast.error(data.message);
      }
    },
  });

  // Mutation for handling OTP confirmation
  const otpMutation = useMutation({
    mutationFn: confirmOtp,
    onSuccess: async (data, variables) => {
      if (data.code === 200) {
        // Show success message and trigger login
        toast.success(t("auth.registerSuccess"));
        loginMutation.mutate({
          email: variables.email,
          password: variables.password,
        });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Return mutation handler and loading state
  return {
    confirmOtp: otpMutation.mutate,
    isLoading: otpMutation.isPending || loginMutation.isPending,
  };
};

export default useConfirmOtp;
