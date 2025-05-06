import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../forms/InputField";
import SubmitButton from "../forms/SubmitButton";

const Step1 = () => {
  // Use the custom hook for form logic
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useFormContext();

  return (
    <form
      className="container form_ui forgetpasswordForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="illustration">
        <img src="/images/forgetpass1.svg" alt="" />
      </div>
      <h1 className="text-center">{t("auth.forgetPasswordTitle")}</h1>
      <p className="title">{t("auth.forgetPasswordSubTitle")}</p>
      <InputField
        label={t("auth.email")}
        placeholder="example@example.com"
        name="email"
        type="email"
        id="email"
        required={true}
        {...register("email")}
        error={errors.email?.message}
      />
      <SubmitButton name={t("auth.send")} loading={isSubmitting} />
    </form>
  );
};

export default Step1;
