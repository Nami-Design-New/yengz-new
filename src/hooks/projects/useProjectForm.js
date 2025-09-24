import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useProjectMutations from "./useProjectMutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseProjectSchema } from "../../validations/projectsFormSchema";
const useProjectForm = (projectDetails = null, skills = []) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [_, setOriginalData] = useState(null);
  const { createProject, updateProject, isLoading } = useProjectMutations();
  const methods = useForm({
    resolver: yupResolver(baseProjectSchema(t)),
    mode: "onChange",
    defaultValues: {
      title: "",
      sub_category_id: "",
      description: "",
      days: "",
      price: "1",
      project_files: [],
      skills: [],
    },
  });

  // Destructure methods for internal use
  const { setValue, getValues, reset } = methods;

  // Initialize form with service data if editing
  useEffect(() => {
    if (projectDetails) {
      setCategoryId(projectDetails?.category?.id);
      const initialData = {
        id: projectDetails?.id,
        title: projectDetails?.title,
        sub_category_id: projectDetails?.sub_category_id,
        price: projectDetails?.price,
        days: projectDetails?.days,
        skills: projectDetails?.skills?.map((skill) => skill?.id) || [],
        description: projectDetails?.description,
        project_files: projectDetails?.files,
        delete_files: [],
      };
      reset(initialData);
      setOriginalData(initialData);
      setCategoryId(initialData.sub_category_id);
    }
  }, [projectDetails, reset]);

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

  // Handle skills selection
  const handleSkillsChange = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];

    setValue("skills", selectedValues);
  };

  // handle add Attachments
  const handleAttachments = (e) => {
    const currentFiles = getValues("project_files") || [];

    const filesArray = Array.from(e.target.files);

    if (filesArray.length > 5) {
      toast.warning("You can only upload up to 5 files.");
      return;
    }
    if (currentFiles.length + filesArray.length > 5) {
      toast.warning("You can only upload up to 5 files.");
      return;
    }

    const updatedFiles = [...currentFiles, ...filesArray];
    setValue("project_files", updatedFiles);
  };

  // HANDLE REMOVE fILE
  const removeFile = (index, file) => {
    const currentFiles = getValues("project_files");
    if (file.id) {
      const currentDeletedFiles = getValues("delete_files") || [];
      setValue("delete_files", [...currentDeletedFiles, file.id]);
    }
    setValue(
      "project_files",
      currentFiles.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data) => {
    console.log("submitting in useProjectForm" , data );

    const dataToSend = {
      ...data,
      skills: data.skills.map((skill) => skill?.value),
      project_files: data.project_files.filter((file) =>
        file?.type?.startsWith("image/")
      ),
    };

    if (projectDetails?.id) {
      updateProject(dataToSend);
    } else {
      createProject(dataToSend);
    }
  };

  return {
    // Form methods and values
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),

    // Form state
    isLoading,
    selectedOptions,
    categoryId,
    setCategoryId,

    // skills handler
    handleSkillsChange,

    // Attachments handler
    handleAttachments,
    removeFile,
  };
};

export default useProjectForm;
