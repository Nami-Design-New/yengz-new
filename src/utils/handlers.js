export const handleApplyFilters = (setSearchParams, searchFilterData) => {
    if (!searchFilterData) return;
  
    const newParams = new URLSearchParams();
  
    for (const [key, value] of Object.entries(searchFilterData)) {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          newParams.set(key, value.join("-"));
        } else if (!Array.isArray(value)) {
          newParams.set(key, value);
        }
      }
    }
  
    setSearchParams(newParams);
  };