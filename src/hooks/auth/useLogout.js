import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authedUser";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axiosInstance";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [cookies, , deleteCookie] = useCookies(["token", "id"]);
  const token = cookies?.token;

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/user/logout", { token });
      if (response.data.code !== 200) {
        throw new Error("Logout failed");
      }
      return response.data;
    },

    onSuccess: () => {
      delete axiosInstance.defaults.headers.common["Authorization"];
      deleteCookie("token");
      deleteCookie("id");
      dispatch(setUser({}));
      sessionStorage.clear();
      queryClient.clear();
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });

  return {
    logout,
    isPending,
  };
}
