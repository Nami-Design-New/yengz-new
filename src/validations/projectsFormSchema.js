import * as yup from "yup";

// Base schema for common validation rules
export const baseProjectSchema = (t) =>
  yup.object().shape({
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
    skills: yup.array().required(t("validation.skillsRequired")),
    project_files: yup
      .array()
      // .min(1, t("validation.atLeastOneImage"))
      // .required(t("validation.imagesRequired")),
  });
