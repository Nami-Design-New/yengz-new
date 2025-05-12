import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchWorks } from "../../services/apiPortfolio";

function useSearchWorks() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const skills = searchParams.get("skills")?.split("-");
  const duration = searchParams.get("duration");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["portfolios", search, skills, duration, sort, page],
    queryFn: () => searchWorks(search, skills, duration, sort, page),
  });

  return { isLoading, data, error, refetch };
}

export default useSearchWorks;
