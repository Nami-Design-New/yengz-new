import { useMutation } from "@tanstack/react-query";
import { addSubject as apiAddSubject } from "../../services/apiCommunities";

export function useAddSubject() {
  const { mutate: addSubject, isPending } = useMutation({
    mutationFn: (reqBody) => apiAddSubject(reqBody),
  });

  return { addSubject, isPending };
}
