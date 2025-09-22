import { useMutation } from "@tanstack/react-query";
import { acceptSponsorInvitation } from "../../services/apiOrgs";

export default function usePostAcceptSponsorInvitation() {
  const { mutate: handleAcceptInvite, isPending } = useMutation({
    mutationFn: (reqBody) => acceptSponsorInvitation(reqBody),
  });

  return { handleAcceptInvite, isPending };
}
