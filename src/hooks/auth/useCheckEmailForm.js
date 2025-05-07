import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { checkEmail } from "../../services/apiAuth";

// Validation schema
const getCheckEmailSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
  });

const useCheckEmailForm = ({ setStep, setOtpData, setUserId }) => {
  const { t } = useTranslation();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getCheckEmailSchema(t)),
    defaultValues: { email: "" },
  });

  // Mutation for checking email
  const { mutate: submitEmail, isPending } = useMutation({
    mutationFn: checkEmail,
    onSuccess: (res) => {
      if (res.code === 200) {
        toast.success(t("auth.otpSentSuccess"));
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.code,
        }));
        setUserId(res.data.user.id);
        setStep(2); // Move to the next step
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      console.error("Forget password error:", error);
      toast.error(t("auth.errorOccurred"));
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    submitEmail(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    getValues,
    errors,
    isSubmitting: isPending,
  };
};

export default useCheckEmailForm;
