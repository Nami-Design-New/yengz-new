import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useCategorieListWithSub() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryListWithSub"],
    queryFn: async function () {
      try {
        const req = await axiosInstance.get("/get_categories_with_subcategory");

        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });

  return { isLoading, data, error };
}

export default useCategorieListWithSub;
