import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { serviceFormSchema } from "../../validations/serviceFormSchema";
import useServiceMutations from "./useServiceMutations";

/**
 * Custom hook for managing service form state and validation
 * @param {Object} initialService - Initial service data for editing
 * @param {Object} skills - Available skills for selection
 * @returns {Object} Form methods and state
 */
const useServiceForm = (initialService = null, skills = []) => {
  const { t } = useTranslation();
  const { createService, updateService, isLoading } = useServiceMutations();
  const totalSteps = 3;

  // Form state
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState((step / totalSteps) * 100);
  const [categoryId, setCategoryId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [originalData, setOriginalData] = useState(null);

  // Initialize React Hook Form with FormProvider
  const methods = useForm({
    resolver: yupResolver(serviceFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      title: "",
      sub_category_id: "",
      description: "",
      days: "",
      price: "",
      instructions: "",
      images: [],
      skills: [],
      developments: [],
      delete_images: [],
      delete_developments: [],
    },
  });

  // Destructure methods for internal use
  const { setValue, getValues, reset, trigger } = methods;

  // Initialize form with service data if editing
  useEffect(() => {
    if (initialService) {
      setCategoryId(initialService?.category?.id);
      const initialData = {
        id: initialService?.id,
        title: initialService?.title,
        description: initialService?.description,
        days: initialService?.days,
        price: initialService?.price,
        instructions: initialService?.instructions,
        images: initialService?.images,
        developments: initialService?.developments,
        sub_category_id: initialService?.sub_category_id,
        skills: initialService?.skills?.map((skill) => skill?.id) || [],
        delete_images: [],
        delete_developments: [],
      };

      // Reset form with initial data
      reset(initialData);
      setOriginalData(initialData);
      setCategoryId(initialData.sub_category_id);
    }
  }, [initialService, reset]);

  // Update selected options when skills change
  useEffect(() => {
    const currentSkills = getValues("skills");

    if (currentSkills?.length > 0 && skills?.length > 0) {
      const options = currentSkills
        .map((skillId) => {
          const option = skills?.find((opt) => opt.id === skillId);
          return {
            value: option?.id,
            label: option?.name,
          };
        })
        .filter(Boolean); // Filter out undefined values

      setSelectedOptions(options);
    }
  }, [getValues, skills]);

  // Update progress bar
  useEffect(() => {
    setProgress((step / totalSteps) * 100);
  }, [step, totalSteps]);

  // Handle form submission
  const onSubmit = (data) => {
    // Check if data is changed when editing
    if (initialService?.id) {
      const isDataChanged =
        JSON.stringify(data) !== JSON.stringify(originalData);
      if (!isDataChanged) {
        toast.warning(t("addService.noChangesMade"));
        return;
      }
    }

    const dataToSend = {
      ...data,
      images: data.images.filter((image) => image?.type?.startsWith("image/")),
      developments: data?.developments?.map((dev) => ({
        id: dev?.id || null,
        description: dev?.description,
        price: dev?.price,
        duration: dev?.duration,
      })),
    };

    if (initialService?.id) {
      updateService(dataToSend);
    } else {
      createService(dataToSend);
    }
  };

  // Validate current step and move to next
  const goToNextStep = async () => {
    // Get fields to validate based on current step
    let fieldsToValidate = [];
    switch (step) {
      case 1:
        fieldsToValidate = [
          "title",
          "sub_category_id",
          "description",
          "skills",
        ];
        break;
      case 2:
        fieldsToValidate = ["price", "days", "images"];
        break;
      default:
        fieldsToValidate = [];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  // Move to previous step
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle development operations
  const addDevelopment = () => {
    const currentDevelopments = getValues("developments") || [];
    setValue("developments", [
      ...currentDevelopments,
      { description: "", price: "", duration: "" },
    ]);
  };

  const removeDevelopment = (index, development) => {
    const currentDevelopments = getValues("developments");
    if (development.id) {
      const currentDeletedDevelopments = getValues("delete_developments") || [];
      setValue("delete_developments", [
        ...currentDeletedDevelopments,
        development.id,
      ]);
    }
    setValue(
      "developments",
      currentDevelopments.filter((_, i) => i !== index)
    );
  };

  // Handle image operations
  const addImages = (newImages) => {
    const currentImages = getValues("images") || [];
    if (currentImages.length + newImages.length > 10) {
      toast.warning(t("addService.imageLimitReached"));
      return;
    }
    setValue("images", [...currentImages, ...newImages]);
  };

  const removeImage = (index, image) => {
    const currentImages = getValues("images");
    if (image.id) {
      const currentDeletedImages = getValues("delete_images") || [];
      setValue("delete_images", [...currentDeletedImages, image.id]);
    }
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  // Handle skills selection
  const handleSkillsChange = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];

    setValue("skills", selectedValues);
  };

  // Create form provider with all methods and state
  const formProvider = {
    ...methods,
    handleSubmit: methods.handleSubmit(onSubmit),
  };

  return {
    // Form provider
    formProvider,

    // Form state
    step,
    loading: isLoading,
    progress,
    categoryId,
    setCategoryId,
    selectedOptions,
    isEdit: !!initialService?.id,

    // Navigation
    goToNextStep,
    goToPreviousStep,

    // Development operations
    addDevelopment,
    removeDevelopment,

    // Image operations
    addImages,
    removeImage,

    // Skills operations
    handleSkillsChange,
  };
};

export default useServiceForm;
