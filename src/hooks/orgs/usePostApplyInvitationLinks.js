import { useMutation } from "@tanstack/react-query";
import { applyInvitationLinks } from "../../services/apiOrgs";

export default function usePostApplyInvitationLinks() {
  const { mutate: handleApplyInvitationLinks, isPending } = useMutation({
    mutationFn: (reqBody) => applyInvitationLinks(reqBody),
  });

  return { handleApplyInvitationLinks, isPending };
}
