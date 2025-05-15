import * as yup from "yup";

export const certificateSchema = (t) =>
  yup.object().shape({
    title: yup.string().required(t("validation.required")),
    image: yup.mixed().required(t("validation.required")),
  });
