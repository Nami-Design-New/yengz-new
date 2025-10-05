import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getServicesByFilter } from "../../services/ApiServices";

function useSearchServicesList() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const rate = Number(searchParams.get("rate"));
  const user_verification = Number(searchParams.get("user_verification"));
  const skills = searchParams.get("skills")?.split("-");
  const user_available = Number(searchParams.get("user_available"));
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
  const is_old = Number(searchParams.get("is_old"));
  const sort = searchParams.get("sort");
  const pageSize = 12;

  const queryKey = [
    "searchServicesList",
    {
      search,
      rate,
      user_verification,
      user_available,
      categories,
      sub_categories,
      is_old,
      skills,
      sort,
    },
  ];

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) =>
        getServicesByFilter(
          search,
          pageParam,
          rate,
          user_verification,
          user_available,
          categories,
          sub_categories,
          is_old,
          skills,
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

export default useSearchServicesList;
