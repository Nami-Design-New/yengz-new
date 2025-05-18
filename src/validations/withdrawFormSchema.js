import * as yup from "yup";

export const withdrawFormSchema = (t) =>
  yup.object().shape({
    amount: yup
      .number()
      .typeError(t("validation.numberType"))
      .positive(t("validation.positiveNumber"))
      .required(t("validation.amountRequired")),
    bank_id: yup.string().when("activeTab", {
      is: "bankTransfer",
      then: () => yup.string().required(t("validation.bankRequired")),
      otherwise: () => yup.string().notRequired(),
    }),
    paypal: yup.string().when("activeTab", {
      is: "paypal",
      then: () => yup.string().required(t("validation.paypalRequired")),
      otherwise: () => yup.string().notRequired(),
    }),
    responsibility: yup
      .boolean()
      .oneOf([true], t("validation.acceptResponsibility"))
      .required(t("validation.required")),
    duration: yup
      .boolean()
      .oneOf([true], t("validation.acceptDuration"))
      .required(t("validation.required")),
    fees: yup
      .boolean()
      .oneOf([true], t("validation.acceptFees"))
      .required(t("validation.required")),
  });
