import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { certificateSchema } from "../../validations/certificateFormSchema";
import { useAddCertificate } from "./useAddCertificate";
import { useUpdateCertificate } from "./useUpdateCertificate";

export const useCertificateForm = (
  targetCertificate,
  setShowModal,
  setTargetCertificate
) => {
  const { t } = useTranslation();
  const imgRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  // Initialize form with react-hook-form and yup validation
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(certificateSchema(t)),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  const { addCertificateMutation, isAddingCertificate } = useAddCertificate();
  const { updateCertificateMutation, isUpdatingCertificate } =
    useUpdateCertificate();

  // Set form values when editing a certificate
  useEffect(() => {
    if (targetCertificate?.id) {
      setValue("title", targetCertificate.title);
      // Don't set image as required when editing
      if (imgRef.current) {
        imgRef.current.src = targetCertificate.image || "/images/gallary.svg";
      }
    }
  }, [targetCertificate, setValue]);

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (imgRef.current) {
        imgRef.current.src = URL.createObjectURL(file);
      }
      setValue("image", file);
    }
  };

  // Form submission handler
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);

    // Only append image if it's a new file or we're adding a new certificate
    if (imageFile || !targetCertificate?.id) {
      formData.append("image", imageFile || data.image);
    }

    // Add ID if editing
    if (targetCertificate?.id) {
      formData.append("id", targetCertificate.id);
      updateCertificateMutation(formData, {
        onSettled: () => {
          // Reset form and close modal
          handleCloseModal();
        },
      });
    } else {
      addCertificateMutation(formData, {
        onSettled: () => {
          // Reset form and close modal
          handleCloseModal();
        },
      });
    }
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    reset();
    setShowModal(false);
    setTargetCertificate(null);
    if (imgRef.current) {
      imgRef.current.src = "/images/gallary.svg";
    }
    setImageFile(null);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isLoading: isAddingCertificate || isUpdatingCertificate,
    imgRef,
    handleImageChange,
    handleCloseModal,
  };
};
