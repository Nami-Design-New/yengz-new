import { useMutation } from "@tanstack/react-query";
import { addComment as apiAddComment } from "../../services/apiCommunities";

export default function useAddComment() {
  const { mutate: addComments, isPending } = useMutation({
    mutationFn: (reqBody) => apiAddComment(reqBody),
  });

  return { addComments, isPending };
}
