import * as yup from "yup";

// Base schema for common validation rules
const baseServiceSchema = (t) => ({
  title: yup.string().required(t("validation.serviceTitle")),
  sub_category_id: yup.string().required(t("validation.subCategory")),
  description: yup.string().required(t("validation.serviceDescription")),
  price: yup
    .number()
    .typeError(t("validation.numberType"))
    .positive(t("validation.positiveNumber"))
    .required(t("validation.priceRequired")),
  days: yup
    .number()
    .typeError(t("validation.numberType"))
    .positive(t("validation.positiveNumber"))
    .required(t("validation.daysRequired")),
  instructions: yup.string(),
  skills: yup.array(),
});


// Step 1 validation schema
export const step1Schema = (t) => yup.object().shape({
  title: baseServiceSchema(t).title,
  sub_category_id: baseServiceSchema(t).sub_category_id,
  description: baseServiceSchema(t).description,
  skills: baseServiceSchema(t).skills,
});


// Step 2 validation schema
export const step2Schema = (t) => yup.object().shape({
  price: baseServiceSchema(t).price,
  days: baseServiceSchema(t).days,
  images: yup
    .array()
    .min(1, t("validation.atLeastOneImage"))
    .required(t("validation.imagesRequired")),
});

// Step 3 validation schema
export const step3Schema = (t) => yup.object().shape({
  instructions: baseServiceSchema(t).instructions,
  developments: yup.array().of(
    yup.object().shape({
      description: yup.string().required(t("validation.developmentDescription")),
      price: yup
        .number()
        .typeError(t("validation.numberType"))
        .positive(t("validation.positiveNumber"))
        .required(t("validation.priceRequired")),
      duration: yup
        .number()
        .typeError(t("validation.numberType"))
        .positive(t("validation.positiveNumber"))
        .required(t("validation.durationRequired")),
    })
  ),
});

// Complete form validation schema
export const serviceFormSchema = (t) => yup.object().shape({
  ...baseServiceSchema(t),
  images: yup
    .array()
    .min(1, t("validation.atLeastOneImage"))
    .required(t("validation.imagesRequired")),
  developments: yup.array().of(
    yup.object().shape({
      description: yup.string(),
      price: yup
        .number()
        .typeError(t("validation.numberType"))
        .positive(t("validation.positiveNumber")),
      duration: yup
        .number()
        .typeError(t("validation.numberType"))
        .positive(t("validation.positiveNumber")),
    })
  ),
  delete_images: yup.array(),
  delete_developments: yup.array(),
});
