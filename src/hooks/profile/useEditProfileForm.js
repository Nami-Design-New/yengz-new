import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { editProfileSchema } from "../../validations/editProfileSchema";
import { useEditProfile } from "./useEditProfile";

// Main hook
export default function useEditProfileForm() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const [wantChangePassword, setWantChangePassword] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [skillsSelectedOptions, setSkillsSelectedOptions] = useState([]);
  const { editProfile, isPending } = useEditProfile();
  // Form methods
  const methods = useForm({
    resolver: yupResolver(editProfileSchema(t)),
    mode: "onChange",
    context: { wantChangePassword },
  });

  const { setValue, reset, handleSubmit } = methods;

  // Set initial form values from user data
  useEffect(() => {
    if (user) {
      // Initialize form with user data
      reset({
        image: "",
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        about: user?.about || "",
        age: user?.age || "",
        country_id: user?.country_id || "",
        is_freelance: user?.is_freelance || 0,
        skills: user?.skills?.map((skill) => skill?.id) || [],
        categories: user?.categories?.map((category) => category?.id) || [],
      });

      // Initialize selected options for multi-select components
      setSelectedOptions(
        user?.categories?.map((category) => ({
          value: category.id,
          label: category.name,
        })) || []
      );

      setSkillsSelectedOptions(
        user?.skills?.map((skill) => ({
          value: skill.id,
          label: skill.name,
        })) || []
      );

      // Handle password field when toggle changes
      if (wantChangePassword) {
        setValue("password", "");
      }
    }
  }, [user, wantChangePassword, reset, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    editProfile(data);
  };

  // Handle category select
  const handleSelect = (selectedItems) => {
    setSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setValue("categories", selectedValues);
  };

  // Handle skills select
  const handleSelectSkills = (selectedItems) => {
    setSkillsSelectedOptions(selectedItems);
    const selectedValues = selectedItems
      ? selectedItems?.map((option) => option.value)
      : [];
    setValue("skills", selectedValues);
  };

  // Toggle password change
  const togglePasswordChange = () => {
    setWantChangePassword(!wantChangePassword);
  };

  return {
    ...methods,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting: isPending,
    wantChangePassword,
    togglePasswordChange,
    selectedOptions,
    skillsSelectedOptions,
    handleSelect,
    handleSelectSkills,
  };
}
