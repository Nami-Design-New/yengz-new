import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { checkEmail, confirmOtp } from "../../services/apiAuth";

const useCheckCodeStep = ({ setOtpData, setStep, setUserId }) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(59);
  const [resendDisabled, setResendDisabled] = useState(true);

  // Mutation for OTP verification
  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: confirmOtp,
    onSuccess: (res) => {
      if (res.code === 200) {
        setStep(3); // Move to the next step
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
      toast.error(t("auth.otpCheckError"));
    },
  });

  // Mutation for resending OTP
  const { mutate: resendOtpMutation, isPending: isResending } = useMutation({
    mutationFn: checkEmail,
    onSuccess: (res) => {
      if (res.code === 200) {
        toast.success(t("auth.otpSentSuccess"));
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.code,
        }));
        setUserId(res.data.user.id);
        setTimer(59); // Reset timer
        setResendDisabled(true);
      } else {
        toast.error(res.message);
      }
    },
    onError: (error) => {
      console.error("Resend OTP error:", error);
      toast.error(t("auth.errorOccurred"));
    },
  });

  // Timer logic for resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return {
    isVerifying,
    isResending,
    verifyOtp,
    resendOtpMutation,
    resendDisabled,
    timer,
  };
};

export default useCheckCodeStep;
