import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import useConfirmOtp from "../../hooks/auth/useConfirmCode";
import OtpContainer from "../../ui/forms/OtpContainer";
import SubmitButton from "../../ui/forms/SubmitButton";

const ConfirmOtp = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();
  const [otpData, setOtpData] = useState({});
  const { confirmOtp, isLoading } = useConfirmOtp();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = getValues();

    // Call confirmOtp mutation with combined data
    confirmOtp({
      ...otpData,
      ...formData,
      is_freelance: formData.is_freelance ? 1 : 0,
      type: "register",
    });
  };

  return (
    <form
      className="container  form_ui forgetpasswordForm otp-small"
      onSubmit={handleSubmit}
    >
      <OtpContainer formData={otpData} setFormData={setOtpData} />

      <SubmitButton
        loading={isLoading}
        className="mt-3"
        name={t("auth.createAccount")}
      />
    </form>
  );
};

export default ConfirmOtp;
