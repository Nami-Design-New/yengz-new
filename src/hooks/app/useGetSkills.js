import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetSkills() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const res = await axios.get("/get_skills");
        return res.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  return { isLoading, data, error };
}
