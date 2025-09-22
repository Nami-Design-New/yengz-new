import { useMutation } from "@tanstack/react-query";
import { updateCompanyTeam } from "../../services/apiOrgs";

export default function usePostUpdateCompanyTeam() {
  const { mutate: handleUpdateCompanyTeam, isPending } = useMutation({
    mutationFn: (reqBody) => updateCompanyTeam(reqBody),
  });

  return { handleUpdateCompanyTeam, isPending };
}
