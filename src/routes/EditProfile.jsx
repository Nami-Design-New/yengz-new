import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useCountriesList from "../hooks/app/useCountriesList";
import useGetSkills from "../hooks/app/useGetSkills";
import useCategoriesList from "../hooks/categories/useCategoriesList";
import useEditProfileForm from "../hooks/profile/useEditProfileForm";
import ImageUpload from "../ui/forms/ImageUpload";
import InputField from "../ui/forms/InputField";
import MultiSelect from "../ui/forms/MultiSelect";
import PasswordField from "../ui/forms/PasswordField";
import PhoneField from "../ui/forms/PhoneField";
import SelectField from "../ui/forms/SelectField";
import SubmitButton from "../ui/forms/SubmitButton";
import TextField from "../ui/forms/TextField";

const EditProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);

  // Custom hook for form handling
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    wantChangePassword,
    togglePasswordChange,
    selectedOptions,
    skillsSelectedOptions,
    handleSelect,
    handleSelectSkills,
    isSubmitting,
  } = useEditProfileForm();

  // Data fetching hooks
  const { data: skills } = useGetSkills();
  const { data: categories } = useCategoriesList();
  const { data: countries } = useCountriesList();

  return (
    <section className="login-section container">
      <h1 className="text-center">{t("profile.editProfile")}</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-12 p-2">
          <form className="container form_ui" onSubmit={handleSubmit}>
            <ImageUpload
              type="file"
              name="userImage"
              id="img-upload"
              accept="image/*"
              image={user?.image}
              setValue={setValue}
            />

            <div className="d-flex gap-2 flex-lg-row flex-column w-100">
              <InputField
                label={t("auth.name")}
                placeholder={t("auth.nameAsInCard")}
                name="name"
                type="text"
                id="name"
                {...register("name")}
                error={errors.name?.message}
              />

              <InputField
                label={t("auth.age")}
                name="age"
                type="date"
                id="age"
                {...register("age")}
                error={errors.age?.message}
              />
            </div>
            <div className="d-flex gap-2 flex-lg-row flex-column w-100">
              <InputField
                label={t("auth.email")}
                placeholder="example@example.com"
                type="email"
                name="email"
                id="email"
                {...register("email")}
                disabled={user?.login_from !== "user"}
                error={errors.email?.message}
              />
            </div>
            <div className="d-flex gap-2 flex-lg-row flex-column w-100">
              <Controller
                name="country_id"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label={t("manageAccounts.country")}
                    id="country_id"
                    name="country_id"
                    disabledOption={t("select")}
                    error={errors.country_id?.message}
                    options={countries?.map((country) => ({
                      name: country.name,
                      value: country.id,
                    }))}
                    {...field}
                  />
                )}
              />
              <PhoneField
                required={true}
                label={t("auth.phone")}
                {...register("phone")}
                value={watch("phone")}
                error={errors?.phone?.message}
              />
            </div>

            <TextField
              icon={<i className="fa-regular fa-circle-info"></i>}
              name="about"
              id="about"
              error={errors.about?.message}
              label={t("auth.aboutUser")}
              placeholder={t("auth.aboutPlaceHolder")}
              {...register("about")}
            />

            <MultiSelect
              label={t("auth.interestes")}
              id="interest"
              name="interest"
              options={categories?.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              selectedOptions={selectedOptions}
              handleChange={(selected) => handleSelect(selected, categories)}
              error={errors.categories?.message}
            />
            <MultiSelect
              label={t("search.skills")}
              id="skills"
              name="skills"
              selectedOptions={skillsSelectedOptions}
              handleChange={handleSelectSkills}
              options={skills?.map((skill) => ({
                label: skill?.name,
                value: skill?.id,
              }))}
              error={errors.skills?.message}
            />
            <div className="question p-0">
              <label htmlFor="isFreelancer" className="quest">
                <img src="/images/Vector.svg" alt="isSeller" />
                {t("auth.areYouSeller")}
              </label>
              <Controller
                name="is_freelance"
                control={control}
                render={({ field }) => (
                  <Form.Switch
                    id="isFreelancer"
                    name="isFreelancer"
                    checked={field.value === 1}
                    onChange={() =>
                      setValue("is_freelance", field.value === 1 ? 0 : 1)
                    }
                  />
                )}
              />
            </div>
            <div className="question p-0 pt-2">
              <label htmlFor="wantChangePassword" className="quest">
                <img src="/images/Vector.svg" alt="isSeller" />
                {t("auth.doYouWantChangePassword")}
              </label>
              <Form.Switch
                id="wantChangePassword"
                name="wantChangePassword"
                checked={wantChangePassword}
                onChange={togglePasswordChange}
              />
            </div>
            {wantChangePassword && (
              <PasswordField
                label={t("auth.newPassword")}
                name="password"
                id="password"
                error={errors.password?.message}
                {...register("password")}
              />
            )}
            <SubmitButton
              loading={isSubmitting}
              name={t("auth.edit")}
              className={"mt-3"}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
