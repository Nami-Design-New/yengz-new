import { useMutation } from "@tanstack/react-query";
import { helpReact } from "../../services/apiHelp";

export default function useHelpReact() {
  const { mutate: handleHelpReact, isPending } = useMutation({
    mutationFn: (reqBody) => helpReact(reqBody),
  });

  return { handleHelpReact, isPending };
}
