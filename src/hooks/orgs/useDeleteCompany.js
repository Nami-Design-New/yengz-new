import { useMutation } from "@tanstack/react-query";
import { deleteCompany } from "../../services/apiOrgs";

export default function useDeleteCompany() {
  const { mutate: handleDeleteCompany, isPending } = useMutation({
    mutationFn: (reqBody) => deleteCompany(reqBody),
  });

  return { handleDeleteCompany, isPending };
}
