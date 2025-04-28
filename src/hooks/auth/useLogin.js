import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../../redux/slices/authedUser";
import axiosInstance from "../../utils/axiosInstance";
import * as yup from "yup";

export default function useLogin(t) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token", "id"]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.passwordLength")),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: submitlogin, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/user/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success(t("auth.loginSuccess"));
        dispatch(setUser(data.data));
        navigate("/");
        setCookie("token", data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setCookie("id", data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${data.data.token}`;
      } else {
        toast.error(t("auth.emailOrPasswordWrong"));
      }
    },
    onError: (error) => {
      toast.error(t("auth.loginErorr"));
      throw new Error(error.message);
    },
  });

  const onSubmit = async (data) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      submitlogin(data);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
    errors,
  };
}
