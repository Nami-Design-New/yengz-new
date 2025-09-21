import { useMutation } from "@tanstack/react-query";
import { deleteMember } from "../../services/apiOrgs";

export default function useDeleteMember() {
  const { mutate: handleDeleteMember, isPending } = useMutation({
    mutationFn: (reqBody) => deleteMember(reqBody),
  });

  return { handleDeleteMember, isPending };
}
