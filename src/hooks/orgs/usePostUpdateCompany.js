import { useMutation } from "@tanstack/react-query";
import { updateCompany } from "../../services/apiOrgs";

export default function usePostUpdateCompany() {
  const { mutate: handleUpdateCompany, isPending } = useMutation({
    mutationFn: (reqBody) => updateCompany(reqBody),
  });

  return { handleUpdateCompany, isPending };
}
