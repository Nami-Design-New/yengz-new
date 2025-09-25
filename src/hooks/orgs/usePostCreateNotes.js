import { useMutation } from "@tanstack/react-query";
import { createNotes } from "../../services/apiOrgs";
import { toast } from "sonner";

export default function usePostCreateNotes() {
  const { mutate: handleCreateNotes, isPending } = useMutation({
    mutationFn: (reqBody) => createNotes(reqBody),
    onSuccess: () => {
      toast.success(" تم إضافة الملاحظة بنجاح");
    },
    onError: (error) => {
      toast.error(`حدث خطأ: ${error.message || "فشل الإضافة"}`);
    },
  });

  return { handleCreateNotes, isPending };
}
