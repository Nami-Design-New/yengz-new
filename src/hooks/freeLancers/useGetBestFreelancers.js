import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getFreelancers } from "../../services/apiFreelancers";

export default function useGetBestFreelancers(refetchPage) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = refetchPage
    ? refetchPage
    : Number(searchParams.get("page")) || 1;
  const rate = Number(searchParams.get("rate")) || null;
  const verified = Number(searchParams.get("verified")) || null;
  const last_login = Number(searchParams.get("last_login")) || null;
  const add_request_in_my_projects =
    Number(searchParams.get("add_request_in_my_projects")) || null;
  const job_title = searchParams.get("job_title") || "";
  const skills = searchParams.get("skills")
    ? searchParams
        .get("skills")
        .split("-")
        .map((skill) => skill)
    : [];
  const categories = searchParams.get("categories")
    ? searchParams
        .get("categories")
        .split("-")
        .map((category) => Number(category))
    : [];

  const queryKey = [
    "bestFreelancers",
    {
      search,
      page,
      rate,
      verified,
      last_login,
      categories,
      job_title,
      add_request_in_my_projects,
      skills,
    },
  ];

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn: () =>
      getFreelancers(
        search,
        page,
        rate,
        verified,
        last_login,
        categories,
        job_title,
        add_request_in_my_projects,
        skills
      ),
  });

  return {
    isLoading,
    data,
    error,
  };
}
