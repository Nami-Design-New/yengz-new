import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegisterForm from "../components/auth/RegisterForm";
// import ConfirmOtp from "../components/auth/ConfirmOtp";
import useRegister from "../hooks/auth/useRegister";

export default function Register() {
  const { t } = useTranslation();
  const { watch } = useRegister();
  const [showOtp, setShowOtp] = useState(false);

  return (
    <section className="login-section container">
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
          : t("auth.otpSubTitle") + watch("email")}
      </p>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-12 p-2">
          {!showOtp && <RegisterForm setShowOtp={setShowOtp} />}
          {/* {showOtp && <ConfirmOtp />} */}
        </div>
      </div>
    </section>
  );
}
