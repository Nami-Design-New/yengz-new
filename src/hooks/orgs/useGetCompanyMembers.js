// src/hooks/orgs/useGetCompanyMembers.js
import { useQuery } from "@tanstack/react-query";
import { getCompanyMembers } from "../../services/apiOrgsDetails";

function useGetCompanyMembers({
  userName,
  search,
  last_login,
  verified,
  job_title,
  skills,
  categories,
  teams,
  country_id,
}) {
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "companyMembers",
      userName,
      search,
      last_login,
      verified,
      job_title,
      skills,
      categories,
      teams,
      country_id,
    ],
    queryFn: () =>
      getCompanyMembers({
        user_name: userName,
        search,
        last_login,
        verified,
        job_title,
        skills,
        categories,
        company_team_ids: teams,
        country_id,
      }),
  });

  return { isLoading, data, error };
}

export default useGetCompanyMembers;
