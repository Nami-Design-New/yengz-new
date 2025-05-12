import { useMutation } from "@tanstack/react-query";
import { addLike as apiAddLike } from "../../services/apiFavorites";

export function useAddLike() {
  const { mutate: addLike, isPending: isAddingLike } = useMutation({
    mutationFn: (workId) => apiAddLike(workId),
  });
  return {
    addLike,
    isAddingLike,
  };
}
