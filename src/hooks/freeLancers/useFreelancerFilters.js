import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/handlers";
import useGetSkills from "../app/useGetSkills";

const defaultFilterState = {
  search: "",
  page: null,
  rate: null,
  verified: null,
  job_title: "",
  last_login: null,
  add_request_in_my_projects: null,
  skills: [],
  categories: [],
};

const parseSearchParams = (searchParams) => ({
  search: searchParams.get("search") || "",
  page: Number(searchParams.get("page")) || null,
  rate: Number(searchParams.get("rate")) || null,
  verified: Number(searchParams.get("verified")) || null,
  job_title: searchParams.get("job_title") || "",
  last_login: Number(searchParams.get("last_login")) || null,
  add_request_in_my_projects:
    Number(searchParams.get("add_request_in_my_projects")) || null,
  skills: searchParams.get("skills")
    ? searchParams
        .get("skills")
        .split("-")
        .map((skill) => skill)
    : [],
  categories: searchParams.get("categories")
    ? searchParams
        .get("categories")
        .split("-")
        .map((category) => Number(category))
    : [],
});

export default function useFreelancerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(parseSearchParams(searchParams));
  const [selectedSkillOptions, setSelectedSkillOptions] = useState([]);
  const { data: skills } = useGetSkills();

  useEffect(() => {
    if (!skills) return;

    const options = filters.skills
      .map((id) => {
        const skill = skills.find((s) => s?.id === Number(id));
        return { value: id, label: skill?.name };
      })
      .filter((option) => option.label); // Filter out undefined skills

    setSelectedSkillOptions(options);
  }, [filters.skills, skills]);

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    if (name !== "categories" && name !== "sub_categories") {
      setFilters((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
      return;
    }

    const categoryValue = Number(value);
    setFilters((prevState) => {
      const updatedState = { ...prevState };
      const updateList = (list, value, add) => {
        return add ? [...list, value] : list.filter((id) => id !== value);
      };

      if (name === "categories") {
        updatedState[name] = updateList(
          prevState[name],
          categoryValue,
          checked
        );
      }
      return updatedState;
    });
  };

  const handleSkillSelect = (selectedItems) => {
    setSelectedSkillOptions(selectedItems || []);
    const selectedValues = selectedItems
      ? selectedItems.map((option) => option.value)
      : [];
    setFilters((prev) => ({
      ...prev,
      skills: selectedValues,
    }));
  };

  const handleRatingChange = (value) => {
    setFilters((prev) => ({ ...prev, rate: value }));
  };

  const applyFilters = (e) => {
    if (e) e.preventDefault();
    handleApplyFilters(setSearchParams, filters);
  };

  const clearFilters = () => {
    setSearchParams({});
    setFilters({ ...defaultFilterState });
    setSelectedSkillOptions([]);
  };

  return {
    filters,
    setFilters,
    selectedSkillOptions,
    handleChange,
    handleSkillSelect,
    handleRatingChange,
    applyFilters,
    clearFilters,
  };
}
