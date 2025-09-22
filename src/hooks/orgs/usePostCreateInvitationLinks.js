import { useMutation } from "@tanstack/react-query"; 
import { createInvitationLinks } from "../../services/apiOrgs";
import { toast } from "sonner";

export default function usePostCreateInvitationLinks(onSuccessCallback) {
  const { mutate: handleCreateInvitationLinks, isPending } = useMutation({
    mutationFn: (reqBody) => createInvitationLinks(reqBody),
    onSuccess: (data) => {
      toast.success("تم إنشاء الرابط بنجاح ✅");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      console.error("Invite error:", error);
      toast.error(error?.message || "حدث خطأ أثناء الإضافة ❌");
    },
  });

  return { handleCreateInvitationLinks, isPending };
}
