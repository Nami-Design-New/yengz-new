import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PasswordField from "../forms/PasswordField";
import SubmitButton from "../forms/SubmitButton";
import { updatePassword } from "../../services/apiAuth";

const Step3 = ({ userId }) => {
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { password: "" },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await updatePassword({ id: userId, password: data.password });
      if (res.code === 200) {
        toast.success(t("auth.newPasswordSuccess"));
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(t("auth.errorOccurred"));
    }
  };

  return (
    <form
      className="container form_ui forgetpasswordForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="confirmpass">
        <img src="/images/newpass1.svg" alt="" />
      </div>

      <h1>{t("auth.newPasswordTitle")}</h1>
      <p className="title">{t("auth.newPasswordSubTitle")}</p>

      <PasswordField
        label={t("auth.newPassword")}
        {...register("password")}
        error={errors.password?.message}
      />

      <SubmitButton loading={isSubmitting} name={t("auth.confirm")} />
    </form>
  );
};

export default Step3;
