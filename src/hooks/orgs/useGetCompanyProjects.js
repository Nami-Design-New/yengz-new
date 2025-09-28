import { useQuery } from "@tanstack/react-query";
import { getCompanyProjects } from "../../services/apiOrgsDetails";

function useGetCompanyProjects({
  userName,
  search,
  company_team_ids,
  member_name,
  freelance_name,
  status,
}) {
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "companyProjects",
      userName,
      search,
      company_team_ids,
      member_name,
      freelance_name,
      status,
    ],
    queryFn: () =>
      getCompanyProjects({
        user_name: userName,
        search,
        company_team_ids,
        member_name,
        freelance_name,
        status,
      }),
    enabled: !!userName, // عشان يتنفذ بس لو في userName
  });

  return { isLoading, data, error };
}

export default useGetCompanyProjects;
