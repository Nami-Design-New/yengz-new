import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import SubmitButton from "../forms/SubmitButton";
import { useCreateTicket } from "../../hooks/tickets/useCreateTicket";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketSchema } from "../../validations/TicketSchema";

const AddTicketModal = ({
  showModal,
  setShowModal,
  targetTicket,
  setTargetTicket,
}) => {
  const { t } = useTranslation();
  const { createTicket, isLoading } = useCreateTicket();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ticketSchema(t)),
    defaultValues: {
      title: "",
      ticket_category_id: "",
      important: "medium",
      description: "",
      reason_id: "",
    },
  });

  useEffect(() => {
    if (targetTicket) {
      reset({
        title: targetTicket.title || "",
        ticket_category_id: targetTicket.ticket_category_id || "",
        important: targetTicket.important || "medium",
        description: targetTicket.description || "",
        reason_id: targetTicket.reason_id || "",
      });
    }
  }, [targetTicket, reset]);

  const handleClose = () => {
    reset();
    setTargetTicket(null);
    setShowModal(false);
  };

  const onSubmit = (data) => {
    createTicket(data, {
      onSuccess: () => {
        reset();
        setTargetTicket(null);
        setShowModal(false);
      },
    });
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("tickets.addTicket")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form
            className="form_ui container m-0 w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              {/* اسم المشكلة */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("tickets.problemName")}
                  {...register("title")}
                  error={errors.title?.message}
                  placeholder={t("tickets.writeHere")}
                />
              </div>

              {/* نوع المشكلة */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("tickets.problemType")}
                  {...register("ticket_category_id")}
                  error={errors.ticket_category_id?.message}
                  placeholder={t("tickets.writeHere")}
                />
              </div>

              {/* الأهمية */}
              <div className="col-lg-6 col-12 p-2">
                <SelectField
                  label={t("tickets.problemImportance")}
                  {...register("important")}
                  error={errors.important?.message}
                  options={[
                    { name: t("tickets.high"), value: "high" },
                    { name: t("tickets.medium"), value: "medium" },
                    { name: t("tickets.low"), value: "low" },
                  ]}
                  disabledOption={t("tickets.select")}
                />
              </div>

              {/* الرقم التعريفي (اختياري) */}
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label={t("tickets.problemIdOptional")}
                  {...register("reason_id")}
                  error={errors.ticket_number?.message}
                  placeholder={t("tickets.exampleId")}
                />
              </div>

              {/* وصف المشكلة */}
              <div className="col-12 p-2">
                <InputField
                  label={t("tickets.problemDescription")}
                  {...register("description")}
                  error={errors.description?.message}
                  as="textarea"
                  rows={3}
                  placeholder={t("tickets.writeDescriptionHere")}
                />
              </div>

              <div className="col-12 p-2">
                <SubmitButton
                  name={
                    targetTicket
                      ? t("tickets.editTicket")
                      : t("tickets.addTicket")
                  }
                  loading={isSubmitting || isLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddTicketModal;
