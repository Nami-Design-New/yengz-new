import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import { registerUser } from "../../services/apiAuth";

// Get validation schema
const registerValidationSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    phone: yup.string().required(t("validation.required")),
    password: yup.string().required(t("validation.required")),
    is_freelance: yup.boolean().required(t("validation.required")),
    job_title: yup.string().required(t("validation.required")),
    country_id: yup.string().required(t("validation.required")),
    skills: yup.array().min(1, t("validation.atLeastOneSkill")).required(),
    categories: yup
      .array()
      .min(1, t("validation.atLeastOneCategory"))
      .required(),
  });

// Separate concerns: Form initial values
const getDefaultValues = () => ({
  image: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  is_freelance: false,
  job_title: "",
  country_id: "",
  skills: [],
  categories: [],
});

// Separate concerns: Mutation logic
const useRegisterMutation = (setShowOtp, setValue) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.code === 200) {
        setShowOtp(true);
        setValue("hashed_code", data.data);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Register error:", error);
      toast.error(error.message);
    },
  });
};

// Main hook
export default function useRegister(setShowOtp) {
  const { t } = useTranslation();

  // Form methods
  const methods = useForm({
    resolver: yupResolver(registerValidationSchema(t)),
    mode: "onChange",
    defaultValues: getDefaultValues(),
  });

  const { setValue, trigger } = methods;

  // Registration mutation
  const { mutate: submitRegister, isPending } = useRegisterMutation(
    setShowOtp,
    setValue
  );

  // Form submission handler
  const onSubmit = (data) => {
    const isFormValid = trigger();
    if (isFormValid) {
      submitRegister(data);
    }
  };

  return {
    ...methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    isPending,
  };
}
