import { useQuery } from "@tanstack/react-query";
import { getUserUserNameEmail } from "../../services/apiOrgs";

function useGetUserUserNameEmail(searchEmail) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["UserUserNameEmail", searchEmail],
    queryFn: () => getUserUserNameEmail(searchEmail),
    enabled: !!searchEmail, // 👈 الكويري تشتغل بس لما يكون فيه searchEmail
  });

  return { isLoading, data, error };
}

export default useGetUserUserNameEmail;
