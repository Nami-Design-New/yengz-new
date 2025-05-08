import { useEffect, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logoutAction, setUser } from "../../redux/slices/authedUser";
import axiosInstance from "../../utils/axiosInstance";
import useGetAuthedUser from "../user/useGetAuthedUser";

export default function useAuth() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const [cookies, , removeCookie] = useCookies(["token", "id"]);
  const { token, id } = cookies;

  const { decodedToken, isExpired } = useMemo(() => {
    if (!token) return { decodedToken: null, isExpired: true };

    try {
      const decoded = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      const expired = decoded.exp < currentTime;

      return { decodedToken: decoded, isExpired: expired };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = token;
    }
  }, [token]);

  const enabled = useMemo(() => {
    return Boolean(token && id && !isExpired, id);
  }, [token, id, isExpired]);

  const { data, isFetched, refetch } = useGetAuthedUser(enabled, id);

  useEffect(() => {
    if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
      dispatch(logoutAction());
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      setIsAuthed(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isFetched) {
          if (data) {
            dispatch(setUser(data));
            setIsAuthed(true);
          } else {
            console.log("Profile data not available, refetching...");
            await refetch();
          }
        } else {
          await refetch();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [
    decodedToken?.sub,
    dispatch,
    id,
    isExpired,
    isFetched,
    data,
    refetch,
    removeCookie,
  ]);

  return { loading, isAuthed };
}
