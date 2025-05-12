import { useMutation } from "@tanstack/react-query";
import { addSubject as apiAddSubject } from "../../services/apiCommunities";

export function useAddSubject() {
  const { mutate: addSubject, isPending } = useMutation({
    mutationFn: () => apiAddSubject(reqBody),
  });

  return { addSubject, isPending };
}
