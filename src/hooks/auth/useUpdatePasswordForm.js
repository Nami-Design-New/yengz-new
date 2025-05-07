import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { updatePassword } from "../../services/apiAuth";

const useUpdatePasswordForm = (userId) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Validation schema
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, t("validation.passwordLength"))
      .required(t("validation.required")),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: "" },
  });

  // Mutation for updating password
  const { mutate: submitPassword, isPending } = useMutation({
    mutationFn: (data) =>
      updatePassword({ id: userId, password: data.password }),
    onSuccess: (res) => {
      if (res.code === 200) {
        toast.success(t("auth.newPasswordSuccess"));
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      console.error("Password update error:", error);
      toast.error(t("auth.errorOccurred"));
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    submitPassword(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
  };
};

export default useUpdatePasswordForm;
