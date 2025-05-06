import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import useCheckEmailForm from "../hooks/auth/useCheckEmailForm";
import Step1 from "../ui/auth/Step1";
import Step2 from "../ui/auth/Step2";
import Step3 from "../ui/auth/Step3";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [otpData, setOtpData] = useState({});

  const methods = useCheckEmailForm({ setStep, setOtpData, setUserId });
  return (
    <FormProvider {...methods}>
      <section className="login-section forgetpassword container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            {step === 1 && <Step1 />}
            {step === 2 && (
              <Step2
                setStep={setStep}
                setOtpData={setOtpData}
                otpData={otpData}
                setUserId={setUserId}
              />
            )}
            {step === 3 && <Step3 userId={userId} />}
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default ForgetPassword;
