import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import * as yup from "yup";
import useAddComment from "../../hooks/community/useAddComment";
import SubmitButton from "../forms/SubmitButton";
import TextField from "../forms/TextField";

const schema = yup.object().shape({
  comment: yup.string().required("Comment is required"),
});

const AddCommentModal = ({ showModal, setShowModal }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addComments, isPending } = useAddComment();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
    },
  });
  function handleClose() {
    setShowModal(false);
  }

  function onSubmit(data) {
    addComments(
      {
        community_post_id: id,
        comment: data.comment,
      },
      {
        onSuccess: () => {
          toast.success(t("communities.commentAddedSuccessfully"));
          queryClient.invalidateQueries(["communityPostDetails"]);
          setShowModal(false);
          reset();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  }
  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("communities.addComment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add-work">
        <div className="login-section">
          <form
            className="form container m-0 w-100"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 p-2">
                <div className="col-12 p-2">
                  <TextField
                    label={t("communities.commentBody")}
                    name="comment"
                    placeholder={t("writeHere")}
                    {...register("comment")}
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

export default AddCommentModal;
