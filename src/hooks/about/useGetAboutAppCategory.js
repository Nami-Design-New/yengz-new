import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetAboutAppCategory() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["useGetAboutAppCategory"],
    queryFn: async function () {
      try {
        const req = await axiosInstance.post("/get_about_app_categories", {
          id,
        });
        return req.data.data;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });

  return { isLoading, data, error };
}

export default useGetAboutAppCategory;
