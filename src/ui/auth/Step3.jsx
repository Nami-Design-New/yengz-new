import { useTranslation } from "react-i18next";
import useUpdatePasswordForm from "../../hooks/auth/useUpdatePasswordForm";
import PasswordField from "../forms/PasswordField";
import SubmitButton from "../forms/SubmitButton";

const Step3 = ({ userId }) => {
  const { t } = useTranslation();

  // Use the custom hook for form logic
  const { register, handleSubmit, onSubmit, errors, isPending } =
    useUpdatePasswordForm(userId);

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

      <SubmitButton loading={isPending} name={t("auth.confirm")} />
    </form>
  );
};

export default Step3;
