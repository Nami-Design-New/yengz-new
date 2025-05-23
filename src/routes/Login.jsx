import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useGoogleAuth from "../hooks/auth/useGoogleAuth ";
import useLogin from "../hooks/auth/useLogin";
import InputField from "../ui/forms/InputField";
import PasswordField from "../ui/forms/PasswordField";
import SubmitButton from "../ui/forms/SubmitButton";
import AppleSigninButton from "../ui/auth/AppleSigninButton";
import { useAppleAuth } from "../hooks/auth/useAppleAuth";

export default function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    isPending,
  } = useLogin();

  // Use the custom Google login hook
  const { handleGoogleLogin } = useGoogleAuth();
  // Use the custom Apple login hook
  const { handleAppleAuth } = useAppleAuth();

  // Apple button would call this on success:
  const onAppleLoginSuccess = (response) => {
    handleAppleAuth(response);
  };

  return (
    <section className="login-section  ">
      <div className="container">
        <h1 className="text-center">{t("auth.loginPageTitle")}</h1>
        <p className="text-center mt-3 title">{t("auth.loginPageSubTitle")}</p>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            <form className="mt-0 form_ui" onSubmit={handleSubmit}>
              <div className="col-12 p-2">
                <InputField
                  label={t("auth.email")}
                  name="email"
                  id="email"
                  type="email"
                  required={true}
                  placeholder={"example@example.com"}
                  {...register("email")}
                  error={errors?.email?.message}
                />
              </div>

              <div className="col-12 p-2">
                <PasswordField
                  label={t("auth.password")}
                  name="password"
                  id="password"
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>

              <Link to="/forget-password" className="forgetpass">
                {t("auth.forgetPassword")}
              </Link>

              <SubmitButton loading={isPending} name={t("auth.login")} />

              <div className="line">
                <span>{t("auth.orLoginWith")}</span>
              </div>

              <div className="d-flex gap-2 flex-lg-row mt-3 flex-column w-100">
                <button
                  type="button"
                  className="auth_social_btn google"
                  onClick={() => handleGoogleLogin()}
                >
                  <img src="/icons/Google.svg" alt="google" />{" "}
                  {t("auth.googleAccount")}
                </button>

                <AppleSigninButton
                  t={t}
                  handleAppleAuth={onAppleLoginSuccess}
                />
              </div>

              <Link to="/register" className="noAccount">
                {t("auth.don'tHaveAccount")}{" "}
                <span>{t("auth.createAccount")}</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
