import { useMutation } from "@tanstack/react-query";
import { leaveCompany } from "../../services/apiOrgs";

export default function useLeaveCompany() {
  const { mutate: handleLeaveCompany, isPending } = useMutation({
    mutationFn: (userName) => leaveCompany(userName),
  });

  return { handleLeaveCompany, isPending };
}
