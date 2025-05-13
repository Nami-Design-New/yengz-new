import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getProjectsByFilter } from "../../services/apiProjects";

function useProjectsList() {
  const [searchParams] = useSearchParams();
  const duration_from = Number(searchParams.get("duration_from"));
  const duration_to = Number(searchParams.get("duration_to"));
  const price_from = Number(searchParams.get("price_from"));
  const price_to = Number(searchParams.get("price_to"));
  const search = searchParams.get("search");
  const categories =
    searchParams.get("categories") &&
    searchParams
      .get("categories")
      .split("-")
      .map((category) => Number(category));
  const sub_categories =
    searchParams.get("sub_categories") &&
    searchParams
      .get("sub_categories")
      .split("-")
      .map((subcategory) => Number(subcategory));
  const sort = searchParams.get("sort");

  const pageSize = 10;

  const queryKey = [
    "projectsList",
    {
      search,
      duration_from,
      duration_to,
      price_from,
      price_to,
      categories,
      sub_categories,
      sort,
    },
  ];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) =>
        getProjectsByFilter(
          search,
          pageParam,
          categories,
          sub_categories,
          duration_from,
          duration_to,
          price_from,
          price_to,
          sort
        ),
      getNextPageParam: (lastPage, pages) => {
        const isMore = lastPage.data.length >= pageSize;
        return isMore ? pages.length + 1 : undefined;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  return {
    data: data?.pages.flatMap((page) => page.data) || [],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}

export default useProjectsList;
