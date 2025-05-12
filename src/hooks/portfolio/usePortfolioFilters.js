import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/handlers";
import useGetSkills from "../app/useGetSkills";

/**
 * Custom hook for managing portfolio filter state and operations
 * Follows the same pattern as useFreelancerFilters for consistency
 */
export default function usePortfolioFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: skills } = useGetSkills();
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Initialize filter state from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    duration: searchParams.get("duration") || "",
    skills: searchParams.get("skills")?.split("-") || [],
    sort: searchParams.get("sort") || "",
    page: Number(searchParams.get("page")) || null,
  });

  // Update selected skill options when skills data or filter changes
  useEffect(() => {
    if (!skills) return;

    const options = filters.skills
      .map((id) => {
        const skill = skills.find((s) => s?.id === Number(id));
        return skill ? { value: id, label: skill.name } : null;
      })
      .filter(Boolean); // Filter out null values

    setSelectedOptions(options);
  }, [filters.skills, skills]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle skill selection from MultiSelect
  const handleSkillSelect = (selectedItems) => {
    setSelectedOptions(selectedItems || []);
    const selectedValues = selectedItems
      ? selectedItems.map((option) => option.value)
      : [];
    setFilters((prev) => ({
      ...prev,
      skills: selectedValues,
    }));
  };

  // Apply filters to URL and trigger search
  const applyFilters = (e) => {
    if (e) e.preventDefault();
    handleApplyFilters(setSearchParams, filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
    setFilters({
      search: "",
      duration: "",
      skills: [],
      sort: "",
      page: null,
    });
    setSelectedOptions([]);
  };

  return {
    filters,
    selectedOptions,
    handleChange,
    handleSkillSelect,
    applyFilters,
    clearFilters,
  };
}
