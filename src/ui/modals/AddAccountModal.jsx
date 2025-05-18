import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useAddBank from "../../hooks/banks/useAddBank";
import useEditBank from "../../hooks/banks/useEditBank";
import DataLoader from "../DataLoader";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import SubmitButton from "../forms/SubmitButton";
import useCountriesList from "../../hooks/app/useCountriesList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../../validations/BankAccountsSchema";

function AddAccountModal({
  showModal,
  setShowModal,
  targetBank,
  setTargetBank,
}) {
  const { t } = useTranslation();
  const { isLoading: isCountriesLoading, data: countries } = useCountriesList();
  const { editBank, isPending: isEditingBank } = useEditBank();
  const { addBank, isPending: isAddingBank } = useAddBank();

  // 2. useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(accountSchema(t)),
    defaultValues: {
      user_name: "",
      iban: "",
      swift: "",
      address1: "",
      address2: "",
      country_id: "",
      zip: "",
      city: "",
      area: "",
    },
  });
  // Prefill on edit
  useEffect(() => {
    if (targetBank) {
      reset({
        user_name: targetBank.user_name || "",
        iban: targetBank.iban || "",
        swift: targetBank.swift || "",
        address1: targetBank.address1 || "",
        address2: targetBank.address2 || "",
        country_id: targetBank.country_id ? String(targetBank.country_id) : "",
        zip: targetBank.zip || "",
        city: targetBank.city || "",
        area: targetBank.area || "",
      });
    }
  }, [targetBank, reset]);

  // Submit Handler
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      country_id: Number(data.country_id),
      id: targetBank?.id,
    };

    if (targetBank) {
      editBank(payload);
    } else {
      addBank(payload);
    }
    reset();
    setTargetBank(null);
    setShowModal(false);
  };

  const onClose = () => {
    reset();
    setTargetBank(null);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={onClose} centered size="lg">
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("manageAccounts.addAccount")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          {isCountriesLoading ? (
            <DataLoader />
          ) : (
            <form
              className="form_ui container m-0 w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-12 p-2">
                  <InputField
                    label={t("manageAccounts.userName")}
                    {...register("user_name")}
                    error={errors.user_name?.message}
                    placeholder={t("writeHere")}
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={t("manageAccounts.iban")}
                    {...register("iban")}
                    error={errors.iban?.message}
                    placeholder="Eg2132132213"
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={t("manageAccounts.swift")}
                    {...register("swift")}
                    error={errors.swift?.message}
                    placeholder="12345"
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={`${t("manageAccounts.address")} 1`}
                    {...register("address1")}
                    error={errors.address1?.message}
                    placeholder={t("writeHere")}
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={`${t("manageAccounts.address")} 2`}
                    {...register("address2")}
                    error={errors.address2?.message}
                    placeholder={t("writeHere")}
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <SelectField
                    label={t("manageAccounts.country")}
                    {...register("country_id")}
                    error={errors.country_id?.message}
                    options={countries?.map((c) => ({
                      name: c.name,
                      value: String(c.id),
                    }))}
                    disabledOption={t("select")}
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={t("manageAccounts.zip")}
                    {...register("zip")}
                    error={errors.zip?.message}
                    placeholder="996"
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={t("manageAccounts.city")}
                    {...register("city")}
                    error={errors.city?.message}
                    placeholder={t("writeHere")}
                  />
                </div>

                <div className="col-lg-6 col-12 p-2">
                  <InputField
                    label={t("manageAccounts.area")}
                    {...register("area")}
                    error={errors.area?.message}
                    placeholder={t("writeHere")}
                  />
                </div>

                {/* Optional checkbox logic can go here */}

                <div className="col-12 p-2">
                  <SubmitButton
                    name={
                      targetBank
                        ? t("manageAccounts.edit")
                        : t("manageAccounts.add")
                    }
                    loading={isSubmitting || isAddingBank || isEditingBank}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddAccountModal;
