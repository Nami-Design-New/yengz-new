import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import usePostApplyInvitationLinks from "../../hooks/orgs/usePostApplyInvitationLinks";
import { useTranslation } from "react-i18next";

export default function InvitationHandler() {
  const { t } = useTranslation();
  const { link, inviteToken } = useParams();
  const navigate = useNavigate();
  const { handleApplyInvitationLinks } = usePostApplyInvitationLinks();
  console.log(link, inviteToken);

  useEffect(() => {
    if (inviteToken) {
      handleApplyInvitationLinks(
        { user_name: link, url: inviteToken },
        {
          onSuccess: () => {
            toast.success(
              t("enterprise.createenterprise.invite.acceptSuccess")
            );
            navigate(`/orgs/${link}`);
          },
          onError: (error) => {
            toast.error(
              error?.response?.message ||
                t("enterprise.createenterprise.invite.acceptFail")
            );
            navigate(`/orgs/${link}`);
          },
        }
      );
    }
  }, [inviteToken, link, navigate, handleApplyInvitationLinks]);

  return null;
}
