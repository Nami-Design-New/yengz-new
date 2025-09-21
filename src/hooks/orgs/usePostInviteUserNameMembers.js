import { useMutation } from "@tanstack/react-query";
import { inviteUserNameMembers } from "../../services/apiOrgs";
import { toast } from "sonner";

export default function usePostInviteUserNameMembers(onClose) {
  const { mutate: handleInviteUserNameMember, isPending } = useMutation({
    mutationFn: (reqBody) => inviteUserNameMembers(reqBody),
    onSuccess: () => {
      toast.success("تمت إضافة العضو بنجاح ");
      if (onClose) onClose(); 
    },
    onError: (error) => {
      console.error("Invite error:", error);
      toast.error(error?.message || "حدث خطأ أثناء الإضافة ");
    },
  });

  return { handleInviteUserNameMember, isPending };
}
