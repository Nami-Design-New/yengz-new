import * as yup from "yup";

export const accountSchema = (t) =>
  yup.object().shape({
    user_name: yup.string().required(t("validation.userName")),
    iban: yup.string().required(t("validation.iban")),
    swift: yup.string().required(t("validation.swift")),
    address1: yup.string().required(t("validation.address1")),
    address2: yup.string().nullable(),
    country_id: yup.string().required(t("validation.country")),
    zip: yup.string().required(t("validation.zip")),
    city: yup.string().required(t("validation.city")),
    area: yup.string().required(t("validation.area")),
  });
