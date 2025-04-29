import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useCategoriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async function () {
      try {
        const req = await axiosInstance.get("/get_categories");
        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });

  return { isLoading, data, error };
}

export default useCategoriesList;
