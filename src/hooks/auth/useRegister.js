import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as yup from "yup";
import axiosInstance from "../../utils/axiosInstance";

export default function useRegister(setShowOtp) {
  const { t } = useTranslation();

  const schema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
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
    },
  });

  const { mutate: submitRegister, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/user/can_register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
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
      throw new Error(error.message);
    },
  });

  const onSubmit = async (data) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      submitRegister(data);
    }
  };

  return {
    register,
    watch,
    setValue,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isPending,
  };
}
