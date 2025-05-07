import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useCheckCodeStep from "../../hooks/auth/useCheckCodeStep";
import OtpContainer from "../forms/OtpContainer";
import SubmitButton from "../forms/SubmitButton";
import ResendCode from "./ResendCode";

const Step2 = ({ otpData, setOtpData, setStep, setUserId }) => {
  const { getValues } = useFormContext();
  const email = getValues("email");
  //   console.log(getValues("email"));

  // Use the custom hook for form logic
  const {
    verifyOtp,
    isVerifying,
    resendOtpMutation,
    isResending,
    resendDisabled,
    timer,
  } = useCheckCodeStep({ otpData, setOtpData, setStep, setUserId });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call VerifyOtp mutation with combined data
    verifyOtp({
      ...otpData,
    });
  };
  const { t } = useTranslation();
  return (
    <form
      className="container form_ui forgetpasswordForm otp-small"
      onSubmit={handleSubmit}
    >
      <div className="otp">
        <img src="/icons/otp1.svg" alt="" />
      </div>

      <h1>{t("auth.otpTitle")}</h1>
      <p className="title">
        {t("auth.otpSubTitle")} <span> {email} </span>
      </p>

      <OtpContainer formData={otpData} setFormData={setOtpData} />

      <ResendCode
        handleResend={() => resendOtpMutation({ email })}
        isResending={isResending}
        resendDisabled={resendDisabled}
        timer={timer}
      />
      <SubmitButton loading={isVerifying} name={t("auth.confirm")} />
    </form>
  );
};

export default Step2;
