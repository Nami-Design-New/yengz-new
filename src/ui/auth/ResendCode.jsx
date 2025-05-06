import { useTranslation } from "react-i18next";

export default function ResendCode({
  handleResend,
  isResending,
  resendDisabled,
  timer,
}) {
  const { t } = useTranslation();
  return (
    <div className="resend-code">
      <span
        onClick={handleResend}
        className={`resend_link ${
          resendDisabled || isResending ? "disabled" : ""
        }`}
        style={{
          cursor: resendDisabled || isResending ? "not-allowed" : "pointer",
        }}
      >
        {isResending ? t("auth.sendingCode") : t("auth.resendCode")}
      </span>
      <div className="timer">
        <span>
          {Math.floor(timer / 60)
            .toString()
            .padStart(2, "0")}
        </span>
        : <span>{(timer % 60).toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
}
