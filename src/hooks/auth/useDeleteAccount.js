import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/slices/authedUser";
import axiosInstance from "../../utils/axiosInstance";

export default function useDeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [, , deleteCookie] = useCookies(["token", "id"]);

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/user/delete_account");
      if (response.data.code !== 200) {
        throw new Error("delete account failed");
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
    deleteAccount,
    isPending,
  };
}
