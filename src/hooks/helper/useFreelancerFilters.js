import { useSearchParams } from "react-router";
import { handleApplyFilters } from "../../utils/handlers";

export default function useFreelancerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...defaultFiltersFromParams(searchParams),
  });

  const applyFilters = () => handleApplyFilters(setSearchParams, filters);
  const clearFilters = () => {
    setSearchParams({});
    setFilters({ ...defaultFilterState });
  };

  return { filters, setFilters, applyFilters, clearFilters };
}
