import { useMutation } from "@tanstack/react-query";
import { deleteCompanyTeam } from "../../services/apiOrgs";

export default function useDeleteCompanyTeam() {
  const { mutate: handleDeleteCompanyTeam, isPending } = useMutation({
    mutationFn: (reqBody) => deleteCompanyTeam(reqBody),
  });

  return { handleDeleteCompanyTeam, isPending };
}
