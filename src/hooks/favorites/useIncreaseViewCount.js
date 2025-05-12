import { useMutation } from "@tanstack/react-query";
import { increaseViewCount as apiIncreaseViewCount } from "../../services/apiFavorites";

// Hook to handle increasing view count
export const useIncreaseViewCount = () => {
  const { mutate: increaseViewCount, isPending: isIncreaseingViewCount } =
    useMutation({ mutationFn: (workId) => apiIncreaseViewCount(workId) });
  return {
    increaseViewCount,
    isIncreaseingViewCount,
  };
};
