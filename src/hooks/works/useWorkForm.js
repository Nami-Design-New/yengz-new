import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseWorkSchema } from "../../validations/workFormSchema";
import { useTranslation } from "react-i18next";
import { useAddWork } from "./useAddWork";
import { useUpdateWork } from "./useUpdateWork";

export const useWorkForm = (targetWork, setTargetWork, onSuccess) => {
  const { t } = useTranslation();
  const { addWork, isPending: isAddingWork } = useAddWork();
  const { updateWork, isPending: isUpdatingWork } = useUpdateWork();
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(baseWorkSchema(t)),
    defaultValues: {
      title: "",
      link: "",
      description: "",
      start_date: "",
      end_date: "",
      skills: [],
      images: [],
      delete_images: [],
    },
  });

  // Watch form values
  const formValues = watch();

  // Set form values when targetWork changes
  useEffect(() => {
    if (targetWork) {
      // Reset form with target work data
      reset({
        id: targetWork.id,
        title: targetWork.title,
        link: targetWork.link || "",
        description: targetWork.description,
        start_date: targetWork.start_date,
        end_date: targetWork.end_date,
        images: targetWork.images || [],
        delete_images: [],
        skills: targetWork.skills?.map((skill) => skill.id) || [],
      });

      // Set selected options for the skills multi-select
      if (targetWork.skills?.length > 0) {
        const options = targetWork.skills.map((skill) => ({
          value: skill.id,
          label: skill.name,
        }));
        setSelectedOptions(options);
      }
    }
  }, [targetWork, reset]);

  // Handle select change for skills
  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems.map((option) => option.value)
      : [];
    setValue("skills", selectedValues, { shouldValidate: true });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", [...formValues.images, ...files], {
      shouldValidate: true,
    });
  };

  // Handle image deletion
  const handleDeleteImage = (index, imageId) => {
    // If it's an existing image with an ID, add to delete_images array
    if (imageId) {
      setValue("delete_images", [...formValues.delete_images, imageId], {
        shouldValidate: false,
      });
    }

    // Remove from images array
    const updatedImages = [...formValues.images];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = (data) => {
    if (targetWork?.id) {
      // Update existing work
      updateWork(
        {
          ...data,
          images: data.images.filter((image) =>
            image?.type?.startsWith("image/")
          ),
        },
        {
          onSettled: () => {
            // Reset form and call success callback
            reset();
            setTargetWork(null);
            setSelectedOptions([]);
            if (onSuccess) onSuccess();
          },
        }
      );
    } else {
      // Add new work
      addWork(data, {
        onSettled: () => {
          // Reset form and call success callback
          reset();
          setTargetWork(null);
          setSelectedOptions([]);
          if (onSuccess) onSuccess();
        },
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isLoading: isAddingWork || isUpdatingWork,
    selectedOptions,
    handleSelect,
    handleFileChange,
    handleDeleteImage,
    formValues,
    reset,
  };
};
