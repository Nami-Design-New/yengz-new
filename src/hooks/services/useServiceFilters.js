import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/handlers";
import useGetSkills from "../app/useGetSkills";
import useCategorieListWithSub from "../categories/useCategorieListWithSub";

export default function useServiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { data: skills } = useGetSkills();
  const { data: categoriesWithSubCategories } = useCategorieListWithSub();

  // Initialize filter state from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || null,
    rate: Number(searchParams.get("rate")) || null,
    user_verification: Number(searchParams.get("user_verification")) || null,
    user_available: Number(searchParams.get("user_available")) || null,
    skills: searchParams.get("skills")
      ? searchParams.get("skills").split("-")
      : [],
    categories: searchParams.get("categories")
      ? searchParams.get("categories").split("-").map(Number)
      : [],
    sub_categories: searchParams.get("sub_categories")
      ? searchParams.get("sub_categories").split("-").map(Number)
      : [],
    is_old: Number(searchParams.get("is_old")) || null,
    price_from: Number(searchParams.get("price_from")) || 5,
    price_to: Number(searchParams.get("price_to")) || 2000,
    duration_from: Number(searchParams.get("duration_from")) || 1,
    duration_to: Number(searchParams.get("duration_to")) || 360,
  });

  // Update selected skill options when skills data or filter changes
  useEffect(() => {
    if (!skills) return;
    const options = filters.skills
      .map((id) => {
        const skill = skills.find((s) => s?.id === Number(id));
        return skill ? { value: id, label: skill.name } : null;
      })
      .filter(Boolean);
    setSelectedOptions(options);
  }, [filters.skills, skills]);

  // Handle range slider changes
  const handleRangeChange = (name, value) => {
    if (name === "duration") {
      setFilters((prev) => ({
        ...prev,
        duration_from: value[0],
        duration_to: value[1],
      }));
    } else if (name === "price") {
      setFilters((prev) => ({
        ...prev,
        price_from: value[0],
        price_to: value[1],
      }));
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    if (name !== "categories" && name !== "sub_categories") {
      setFilters((prev) => ({ ...prev, [name]: parsedValue }));
      return;
    }

    const categoryValue = Number(value);
    setFilters((prev) => {
      const updated = { ...prev };
      const updateList = (list, val, add) =>
        add ? [...list, val] : list.filter((id) => id !== val);

      if (name === "categories") {
        updated[name] = updateList(prev[name], categoryValue, checked);
        const relatedSubCategories =
          categoriesWithSubCategories
            .find((cat) => cat.id === categoryValue)
            ?.sub_categories.map((sub) => sub.id) || [];

        updated["sub_categories"] = checked
          ? [...new Set([...prev["sub_categories"], ...relatedSubCategories])]
          : prev["sub_categories"].filter(
              (id) => !relatedSubCategories.includes(id)
            );
      } else if (name === "sub_categories") {
        updated[name] = updateList(prev[name], categoryValue, checked);
        const parentCategory = categoriesWithSubCategories.find((cat) =>
          cat.sub_categories.some((sub) => sub.id === categoryValue)
        );

        if (parentCategory) {
          const allChildIds = parentCategory.sub_categories.map(
            (sub) => sub.id
          );
          const areAllChildrenChecked = allChildIds.every((id) =>
            updated["sub_categories"].includes(id)
          );
          updated["categories"] = areAllChildrenChecked
            ? [...new Set([...prev["categories"], parentCategory.id])]
            : prev["categories"].filter((id) => id !== parentCategory.id);
        }
      }
      return updated;
    });
  };

  // Handle skill selection from MultiSelect
  const handleSkillSelect = (selectedItems) => {
    setSelectedOptions(selectedItems || []);
    const selectedValues = selectedItems
      ? selectedItems.map((option) => option.value)
      : [];
    setFilters((prev) => ({ ...prev, skills: selectedValues }));
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
      page: null,
      rate: null,
      user_verification: null,
      user_available: null,
      skills: [],
      categories: [],
      sub_categories: [],
      is_old: null,
      price_from: 5,
      price_to: 2000,
      duration_from: 1,
      duration_to: 360,
    });
    setSelectedOptions([]);
  };

  return {
    filters,
    selectedOptions,
    handleChange,
    handleSkillSelect,
    handleRangeChange,
    applyFilters,
    clearFilters,
    categoriesWithSubCategories,
  };
}
