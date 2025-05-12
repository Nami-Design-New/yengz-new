import { QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetCommunitiesList from "../../hooks/community/useGetCommunitiesList";
import { toast } from "sonner";
import { addSubject } from "../../services/apiCommunities";
import { Modal } from "react-bootstrap";
import SelectField from "../forms/SelectField";
import SubmitButton from "../forms/SubmitButton";
import InputField from "../forms/InputField";
import TextField from "../forms/TextField";
import { useAddSubject } from "../../hooks/community/useAddSubject";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required").min(10),
  community_category_id: yup.string().required("Community is required"),
});

const AddSubjectModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      community_category_id: "",
    },
  });

  const { data: communities } = useGetCommunitiesList();
  const { addSubject, isPending } = useAddSubject();
  const onSubmit = (data) => {
    addSubject(
      {
        title: data.title,
        description: data.description,
        community_category_id: Number(data.community_category_id),
      },
      {
        onSuccess: () => {
          toast.success(t("communities.subjectAddedSuccessfully"));
          reset();
          setShowModal(false);
          queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      }
    );
  };
  const handleClose = () => {
    reset();
    setShowModal(false);
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("communities.addSubject")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form
            className="form container m-0 w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className=" col-12 p-2">
                <InputField
                  label={t("communities.subjectTitle")}
                  type="text"
                  name="title"
                  {...register("title")}
                  errors={errors?.title?.message}
                />
              </div>
              <div className=" col-12 p-2">
                <SelectField
                  label={t("communities.community")}
                  id="community_category_id"
                  disabledOption={t("select")}
                  required
                  options={communities?.map((option) => ({
                    name: option.name,
                    value: option.id,
                  }))}
                  {...register("community_category_id")}
                  error={errors?.community_category_id?.message}
                />
              </div>
              <div className="col-12 p-2">
                <div className="col-12 p-2">
                  <TextField
                    label={t("communities.subjectDescription")}
                    name="description"
                    {...register("description")}
                    error={errors?.description?.message}
                  />
                </div>
              </div>
              <div className="col-12 p-2">
                <SubmitButton name={t("communities.add")} loading={isPending} />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddSubjectModal;
