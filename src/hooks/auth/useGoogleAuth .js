import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { setUser } from "../../redux/slices/authedUser";
import { setAuthCookies } from "./useLogin";
import { setAuthToken } from "../../services/apiAuth";
import axiosInstance from "../../utils/axiosInstance";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token", "id"]);

  const handleGoogleLogin = useGoogleLogin({
    flow: "popup", // Use popup mode
    onSuccess: async (tokenResponse) => {
      try {
        // Send the Google token to the backend for authentication
        const res = await axiosInstance.post("/user/social_login", {
          login_from: "google",
          google_token: tokenResponse.access_token,
        });

        if (res.data.code === 200) {
          // Handle successful login
          toast.success("Login successful!");
          dispatch(setUser(res.data.data));
          setAuthCookies(setCookie, res.data.data);
          setAuthToken(res.data.data.token);
          navigate("/");
        } else {
          // Handle backend error
          toast.error(res.data.message || "Login failed!");
        }
      } catch (error) {
        // Handle network or other errors
        toast.error("An error occurred during Google login.");
        console.error("Google Login Error:", error);
      }
    },
    onError: (error) => {
      // Handle errors from the Google login process
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  return { handleGoogleLogin };
};

export default useGoogleAuth;
