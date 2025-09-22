import { useMutation } from "@tanstack/react-query";
import { changeSponsor } from "../../services/apiOrgs";

export default function usePostChangeSponsor() {
  const { mutate: handleChangeSponsor, isPending } = useMutation({
    mutationFn: (reqBody) => changeSponsor(reqBody),
  });

  return { handleChangeSponsor, isPending };
}
