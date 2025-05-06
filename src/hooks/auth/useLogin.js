import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as yup from "yup";
import { setUser } from "../../redux/slices/authedUser";
import { loginUser, setAuthToken } from "../../services/apiAuth";

// Helper function to set authentication cookies with secure options
export const setAuthCookies = (setCookie, userData) => {
  const cookieOptions = {
    path: "/",
    secure: true,
    sameSite: "Strict",
  };
  setCookie("token", userData.token, cookieOptions);
  setCookie("id", userData.id, cookieOptions);
};

// Form validation schema using Yup
export const loginValidationSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordLength")),
  });

// Handle successful login response
const handleLoginSuccess = (data, dispatch, navigate, setCookie, t) => {
  toast.success(t("auth.loginSuccess"));
  dispatch(setUser(data.data));
  setAuthCookies(setCookie, data.data);
  setAuthToken(data.data.token);
  navigate("/");
};

// React Query mutation hook for login
const useLoginMutation = (t, dispatch, navigate, setCookie) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.code === 200) {
        handleLoginSuccess(data, dispatch, navigate, setCookie, t);
      } else {
        toast.error(t("auth.emailOrPasswordWrong"));
      }
    },
    onError: (error) => {
      toast.error(t("auth.loginErorr"));
      throw new Error(error.message);
    },
  });
};

// Main login hook that combines form handling and API calls
export default function useLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token", "id"]);

  // Initialize form with validation and default values
  const methods = useForm({
    resolver: yupResolver(loginValidationSchema(t)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { trigger } = methods;

  // Setup login mutation with necessary dependencies
  const { mutate: submitLogin, isPending } = useLoginMutation(
    t,
    dispatch,
    navigate,
    setCookie
  );

  // Handle form submission after validation
  const onSubmit = async (data) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      submitLogin(data);
    }
  };

  // Return form methods and submission handler
  return {
    ...methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    isPending,
  };
}
