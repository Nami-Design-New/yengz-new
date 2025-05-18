import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router";
import { useCreateComplaint } from "../hooks/complaints/useCreateComplaint";
import SectionHeader from "../ui/SectionHeader";
import InputField from "../ui/forms/InputField";
import SelectField from "../ui/forms/SelectField";
import TextField from "../ui/forms/TextField";
import { complaintSchema } from "../validations/complaintSchema";
import SubmitButton from "../ui/forms/SubmitButton";

const Complaints = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(complaintSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "",
      images: [],
    },
  });

  const { mutate: createComplaint, isPending } = useCreateComplaint();
  const images = watch("images");

  const handleAttachments = (e) => {
    const filesArray = Array.from(e.target.files);
    setValue("images", [...images, ...filesArray]);
  };

  const removeFile = (index) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setValue("images", updatedFiles);
  };

  const onSubmit = (data) => {
    createComplaint(data, {
      onSuccess: (response) => {
        if (response.code === 200) {
          toast.success(t("complaints.complaintSentSuccessfully"));
          reset();
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <>
      <SectionHeader title={t("complaints.pageTitle")} />
      <section className="addRequest">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12 p-2">
              <form className="form_ui" onSubmit={handleSubmit(onSubmit)}>
                <div className="row m-0">
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label={t("complaints.title")}
                      error={errors.title?.message}
                      {...register("title")}
                      placeholder={t("writeHere")}
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <SelectField
                      {...register("type")}
                      error={errors.type?.message}
                      label={t("complaints.type")}
                      disabledOption={t("complaints.choose")}
                      options={[
                        {
                          name: t("complaints.type1"),
                          value: "complaint",
                        },
                        {
                          name: t("complaints.type2"),
                          value: "suggestion",
                        },
                      ]}
                    />
                  </div>
                  <div className="col-12 p-2">
                    <TextField
                      label={t("complaints.message")}
                      error={errors.message?.message}
                      {...register("message")}
                      placeholder={t("writeHere")}
                    />
                  </div>{" "}
                  <div className="col-12 p-2">
                    <label className="upload_attachments">
                      <div className="icon">
                        <img src="/images/img-upload.svg" alt="icon" />
                      </div>
                      <div className="content">
                        <h6>{t("projects.addattachments")}</h6>
                      </div>
                      <input
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleAttachments}
                      />
                    </label>
                  </div>
                  {images?.length > 0 && (
                    <div className="col-12 p-2">
                      <div className="attachments">
                        {images?.map((file, index) => (
                          <div className="attachment" key={index}>
                            <div className="d-flex align-items-center gap-3">
                              <div className="icon">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="icon"
                                />
                              </div>
                              <div className="content">
                                <h6>
                                  {file?.file ? (
                                    <Link target="_blank" to={file?.file}>
                                      {file?.file}
                                    </Link>
                                  ) : (
                                    file?.name
                                  )}
                                </h6>
                                <p>
                                  {file?.file_size
                                    ? file?.file_size?.toFixed(2)
                                    : (file.size / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </div>
                            <div
                              className="delete"
                              onClick={() => removeFile(index, file)}
                            >
                              <i className="fa-regular fa-trash"></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-12 p-2 d-flex justify-content-end">
                  <SubmitButton
                    loading={isPending}
                    name={t("complaints.submit")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Complaints;
