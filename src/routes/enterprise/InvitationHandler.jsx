import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import usePostApplyInvitationLinks from "../../hooks/orgs/usePostApplyInvitationLinks";

export default function InvitationHandler() {
  const { link, inviteToken } = useParams();
  const navigate = useNavigate();
  const { handleApplyInvitationLinks } = usePostApplyInvitationLinks();
    console.log(link ,  inviteToken);
    
  useEffect(() => {
    if (inviteToken) {
      handleApplyInvitationLinks(
        { user_name: link, url: inviteToken },
        {
          onSuccess: () => {
            toast.success("تم قبول الدعوة بنجاح ");
            navigate(`/orgs/${link}`);
          },
          onError: (error) => {
            toast.error(error?.response?.message || "فشل في قبول الدعوة ");
            navigate(`/orgs/${link}`);
          },
        }
      );
    }
  }, [inviteToken, link, navigate, handleApplyInvitationLinks]);

  return null;
}
