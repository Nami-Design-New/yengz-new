import { useMutation } from "@tanstack/react-query";
import { createCompanyTeam } from "../../services/apiOrgs";

export default function usePostCreateCompanyTeam() {
  const { mutate: handleCreateCompanyTeam, isPending } = useMutation({
    mutationFn: (reqBody) => createCompanyTeam(reqBody),
  });

  return { handleCreateCompanyTeam, isPending };
}
