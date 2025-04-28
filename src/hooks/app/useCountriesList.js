import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useCountriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["countriesList"],
    queryFn: async function () {
      try {
        const req = await axiosInstance.get("/get_countries");
        return req.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { isLoading, data, error };
}

export default useCountriesList;
