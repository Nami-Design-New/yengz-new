import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useProjectMutations from "./useProjectMutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseProjectSchema } from "../../validations/projectsFormSchema";
import { useSearchParams } from "react-router";
import useGetCompanyDetails from "../orgs/useGetCompanyDetails";
const useProjectForm = (projectDetails = null, skills = []) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { createProject, updateProject, isLoading } = useProjectMutations();
  const [searchParams] = useSearchParams();
  const org = searchParams.get("org");
  console.log(org, searchParams);

  const { data: companyDetailsData } = useGetCompanyDetails(org);

  const methods = useForm({
    resolver: yupResolver(baseProjectSchema(t)),
    mode: "onChange",
    defaultValues: {
      id: "",
      title: "",
      sub_category_id: "",
      description: "",
      days: "",
      price: "1",
      company_team_id: "",
    },
  });
  console.log("projectDetails", projectDetails);

  // Destructure methods for internal use
  const { setValue, getValues, reset } = methods;

  useEffect(() => {
    if (projectDetails) {
      reset({
        id: projectDetails.id | "",
        title: projectDetails?.title || "",
        description: projectDetails?.description || "",
        price: projectDetails?.price || "",
        days: projectDetails?.days || "",
        sub_category_id: projectDetails?.sub_category_id || "",
        company_team_id: projectDetails?.company_team_id || "",
        skills: projectDetails?.skills?.map((s) => s.id) || [],
        project_files: projectDetails?.files || [],
        extra: projectDetails?.extra || [],
      });

      setCategoryId(projectDetails?.category?.id || "");
    }
  }, [projectDetails, reset, setCategoryId]);

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
  const cleanObject = (obj) => {
    const cleaned = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // تجاهل القيم الفاضية
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return;
      }

      cleaned[key] = value;
    });
    return cleaned;
  };

  const onSubmit = (data) => {
    let extra = [];

    if (
      data?.extra &&
      data.extra[0] &&
      (data.extra[0].name_ar || data.extra[0].name_en)
    ) {
      extra = [
        {
          name_ar: data.extra[0].name_ar || "",
          name_en: data.extra[0].name_en || "",
          value: data.extra[0].value || "",
          type: data.extra[0].type || "",
        },
      ];
    }

    // skills
    let formattedSkills = [];
    if (Array.isArray(data.skills)) {
      if (typeof data.skills[0] === "object" && data.skills[0] !== null) {
        formattedSkills = data.skills.map((s) => s.value);
      } else {
        formattedSkills = data.skills;
      }
    }

    // project_files (خليها بس الملفات الجديدة أو IDs المحذوفة)
    let formattedFiles = [];
    if (Array.isArray(data.project_files)) {
      formattedFiles = data.project_files
        .map((file) => {
          if (file instanceof File) return file; // ملف جديد مرفوع
          if (file.file) return file.file; // في حال رجع object فيه file
          return null; // تجاهل أي object فيه created_at, updated_at, ...
        })
        .filter(Boolean);
    }

    let dataToSend = {
      id: data.id, // مهم
      title: data.title,
      sub_category_id: data.sub_category_id,
      price: data.price,
      days: data.days,
      description: data.description,
      skills: formattedSkills,
      project_files: formattedFiles,
      delete_files: data.delete_files || [],
      extra,
      company_team_id: data.company_team_id || "",
    };

    // 🧹 شيل أي key فاضي
    dataToSend = cleanObject(dataToSend);

    console.log("final update data", dataToSend);

    if (projectDetails?.id) {
      updateProject(dataToSend);
    } else {
      createProject(dataToSend);
    }
  };

  console.log(companyDetailsData);

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
