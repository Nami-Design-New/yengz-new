import * as yup from "yup";

export const editProfileSchema = (t) =>
  yup.object().shape({
    name: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    phone: yup.string().required(t("validation.required")),
    about: yup.string().nullable(),
    age: yup.string().required(t("validation.required")),
    country_id: yup.string().required(t("validation.required")),
    is_freelance: yup.number().default(0),
    skills: yup.array().of(yup.number()).nullable(),
    categories: yup.array().of(yup.number()).nullable(),
    image: yup.mixed().nullable(),
    password: yup.string().when("wantChangePassword", {
      is: true,
      then: (schema) => {
        return schema
          .min(6, t("validation.passwordMinLength"))
          .required(t("validation.required"));
      },
      otherwise: (schema) => schema.nullable(),
    }),
  });
