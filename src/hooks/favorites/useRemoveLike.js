import { useMutation } from "@tanstack/react-query";
import {
  removeLike as apiRemoveLike,
  increaseViewCount as apiIncreaseViewCount,
} from "../../services/apiFavorites";

export const useRemoveLike = () => {
  const { mutate: removeLike, isPending: isRemovingLike } = useMutation({
    MutationFn: (workId) => apiRemoveLike(workId),
  });

  return {
    removeLike,
    isRemovingLike,
  };
};
