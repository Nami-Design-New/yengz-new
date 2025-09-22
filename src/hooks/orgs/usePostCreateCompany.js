import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../../services/apiOrgs";

export default function usePostCreateCompany() {
  const { mutate: handleCreateCompany, isPending } = useMutation({
    mutationFn: (reqBody) => createCompany(reqBody),
  });

  return { handleCreateCompany, isPending };
}
