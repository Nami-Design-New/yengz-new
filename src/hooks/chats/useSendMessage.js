import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../../services/apiChats";
import { toast } from "sonner";

export default function useSendMessage() {
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      // Invalidate and refetch the chat data
      queryClient.invalidateQueries({ queryKey: ["chat-object"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
      console.error("Error sending message:", error);
    },
  });

  return { sendMessage, isPending };
}
