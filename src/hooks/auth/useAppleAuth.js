// hooks/useAppleLogin.js
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";
import { setUser } from "../../redux/slices/authedUser";
import { useCookies } from "react-cookie";
export const useAppleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [, setCookie] = useCookies(["token", "id"]);
  const handleAppleAuth = async (response) => {
    if (response?.authorization?.id_token) {
      try {
        const res = await axiosInstance.post("/user/social_login", {
          login_from: "apple",
          google_token: response?.authorization?.id_token,
        });

        if (res.data.code === 200) {
          toast.success(t("auth.loginSuccess"));
          dispatch(setUser(res.data.data));
          navigate("/");

          setCookie("token", res.data.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          setCookie("id", res.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });

          axiosInstance.defaults.headers.common["Authorization"] =
            res.data.data.token;
        }
      } catch (error) {
        console.error("Apple login error:", error);
        toast.error(t("auth.loginFailed") || "Login failed.");
      }
    }
  };

  return { handleAppleAuth };
};
