import { useMutation } from "@tanstack/react-query";
import { rejectSponsorInvitation } from "../../services/apiOrgs";

export default function usePostRejectSponsorInvitation() {
  const { mutate: handleRejectInvite, isPending } = useMutation({
    mutationFn: (reqBody) => rejectSponsorInvitation(reqBody),
  });

  return { handleRejectInvite, isPending };
}
