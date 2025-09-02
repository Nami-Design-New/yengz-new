import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useCountriesList from "../../hooks/app/useCountriesList";
import ImageUpload from "../../ui/forms/ImageUpload";
import InputField from "../../ui/forms/InputField";
import MultiSelect from "../../ui/forms/MultiSelect";
import PasswordField from "../../ui/forms/PasswordField";
import PhoneField from "../../ui/forms/PhoneField";
import SelectField from "../../ui/forms/SelectField";
import SubmitButton from "../../ui/forms/SubmitButton";
import useGetSkills from "./../../hooks/app/useGetSkills";
import useCategoriesList from "./../../hooks/categories/useCategoriesList";
import useGoogleAuth from "../../hooks/auth/useGoogleAuth ";
import { useAppleAuth } from "../../hooks/auth/useAppleAuth";
import AppleSigninButton from "./AppleSigninButton";

const RegisterForm = () => {
  const { t } = useTranslation();

  const { data: countries } = useCountriesList();
  const { data: categories } = useCategoriesList();
  const { data: skills } = useGetSkills();

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    isPending,
  } = useFormContext();
  // Use the custom Google login hook
  const { handleGoogleLogin } = useGoogleAuth();
  // Use the custom Apple login hook
  const { handleAppleAuth } = useAppleAuth();

  // Apple button would call this on success:
  const onAppleLoginSuccess = (response) => {
    handleAppleAuth(response);
  };

  const handleSelectSkills = (selectedItems) => {
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setValue("skills", selectedValues);
  };

  const handleSelectCategories = (selectedItems) => {
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setValue("categories", selectedValues);
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <ImageUpload
        type="file"
        name="userImage"
        id="img-upload"
        accept="image/*"
        setValue={setValue}
      />

      <div className="d-flex gap-2 flex-lg-row flex-column w-100">
        <InputField
          label={t("auth.name")}
          placeholder={t("auth.nameAsInCard")}
          name="name"
          type="text"
          id="name"
          required={true}
          {...register("name")}
          error={errors?.name?.message}
        />

        <InputField
          label={t("auth.jobTitle")}
          name="job_title"
          type="text"
          id="job_title"
          required={true}
          placeholder={t("auth.jobTitle")}
          {...register("job_title")}
          error={errors?.job_title?.message}
        />
      </div>

      <div className="d-flex gap-2 flex-lg-row flex-column w-100">
        <InputField
          label={t("auth.email")}
          placeholder="example@example.com"
          type="email"
          name="email"
          id="email"
          required={true}
          {...register("email")}
          error={errors?.email?.message}
        />

        <PasswordField
          label={t("auth.password")}
          name={"password"}
          id={"password"}
          minLength={6}
          {...register("password")}
          error={errors?.password?.message}
        />
      </div>

      <div className="d-flex gap-2 flex-lg-row flex-column w-100">
        <SelectField
          label={t("auth.country")}
          id="country_id"
          name="country_id"
          disabledOption={t("select")}
          required={true}
          {...register("country_id")}
          error={errors?.country_id?.message}
          options={countries?.map((country) => ({
            name: country.name,
            value: country.id,
          }))}
        />

        <PhoneField
          required={true}
          label={t("auth.phone")}
          {...register("phone")}
          error={errors?.phone?.message}
        />
      </div>

      <MultiSelect
        label={t("auth.interestes")}
        id="interest"
        name="interest"
        handleChange={handleSelectCategories}
        error={errors?.categories?.message}
        options={categories?.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      <MultiSelect
        label={t("auth.skills")}
        id="skills"
        name="skills"
        handleChange={handleSelectSkills}
        error={errors?.skills?.message}
        options={skills?.map((skill) => ({
          label: skill?.name,
          value: skill?.id,
        }))}
      />

     <div className="question">
              <label className="quest">
                <img src="/icons/Vector.svg" alt="role" />
                {t("auth.chooseRole")}
              </label>

              <div className="role-segment">
                {[
                  { value: "no", label: t("auth.seller") },
                  { value: "yes", label: t("auth.buyer") },
                  { value: "all", label: t("auth.both") },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`segment-btn ${
                      watch("is_freelance") === opt.value ? "active" : ""
                    }`}
                    onClick={() => setValue("is_freelance", opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

      <p>
        {t("auth.byContinoung")}{" "}
        <Link to="/terms-conditions">{t("auth.terms")} </Link> {t("auth.and")}{" "}
        <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>{" "}
        {t("auth.ownbyus")}
      </p>

      <SubmitButton name={t("auth.createAccount")} loading={isPending} />

      <div className="line">
        <span>{t("auth.orRegisterWith")}</span>
      </div>
      <div className="d-flex gap-2 flex-lg-row mt-3 flex-column w-100">
        <button
          type="button"
          className="auth_social_btn google"
          onClick={() => handleGoogleLogin()}
        >
          <img src="/icons/Google.svg" alt="google" /> {t("auth.googleAccount")}
        </button>

        <AppleSigninButton t={t} handleAppleAuth={onAppleLoginSuccess} />
      </div>
      <Link to="/login" className="noAccount">
        {t("auth.alreadyHaveAccount")} <span>{t("auth.login")}</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
