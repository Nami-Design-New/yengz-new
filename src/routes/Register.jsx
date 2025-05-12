import { useState } from "react";
import { useTranslation } from "react-i18next";
import useRegister from "../hooks/auth/useRegister";
import { FormProvider } from "react-hook-form";
import RegisterForm from "../ui/auth/RegisterForm";
import ConfirmOtp from "../ui/auth/ConfirmOtp";

export default function Register() {
  const { t } = useTranslation();
  const [showOtp, setShowOtp] = useState(false);
  const methods = useRegister(setShowOtp);

  return (
    <FormProvider {...methods}>
      <section className="login-section">
        {showOtp && (
          <div className="otp">
            <img src="/icons/otp1.svg" alt="" />
          </div>
        )}

        <h1 className="text-center">
          {!showOtp ? t("auth.registerPageTitle") : t("auth.otpTitle")}
        </h1>

        <p className="text-center mt-3 mb-0 title">
          {!showOtp
            ? t("auth.registerPageSubTitle")
            : t("auth.otpSubTitle") + methods.watch("email")}
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            {!showOtp && <RegisterForm />}
            {showOtp && <ConfirmOtp />}
          </div>
        </div>
      </section>
    </FormProvider>
  );
}
