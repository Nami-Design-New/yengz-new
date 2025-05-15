import * as yup from "yup";

export const baseWorkSchema = (t) =>
  yup.object().shape({
    title: yup.string().required(t("validation.required")),
    link: yup
      .string()
      .required(t("validation.required"))
      .url(t("validation.url")),
    description: yup.string().required(t("validation.required")),
    start_date: yup.string().required(t("validation.required")),
    end_date: yup.string().required(t("validation.required")),
    skills: yup.array().min(1, t("validation.required")),
    images: yup
      .array()
      .min(1, t("validation.atLeastOneImage"))
      .required(t("validation.required")),
  });
