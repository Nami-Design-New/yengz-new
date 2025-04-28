import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setIsLogged, setUser } from "../../../redux/slices/authedUser";
import Otpcontainer from "../../../ui/form-elements/OtpContainer";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import axios from "./../../../utils/axios";

const ConfirmOtp = ({ otpData, setOtpData, formData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };
  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      ...formData,
      is_freelance: formData.is_freelance ? 1 : 0,
      type: "register",
    },
    url: "/user/check_code",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.request(checkCodeRequest);
      if (res.data.code === 200) {
        toast.success(t("auth.registerSuccess"));
        const login = await axios.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });
        if (login.data.code === 200) {
          navigate("/");
          dispatch(setUser(login.data.data));
          dispatch(setIsLogged(true));
          setCookie("token", login.data.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          setCookie("id", login.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          axios.defaults.headers.common[
            "Authorization"
          ] = `${login.data.data.token}`;
        } else {
          toast.error(login.data.message);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="container form forgetpasswordForm otp-small"
      onSubmit={handleSubmit}
    >
      <Otpcontainer formData={otpData} setFormData={setOtpData} />

      <SubmitButton
        loading={loading}
        name={t("auth.createAccount")}
        className={"mt-3"}
      />
    </form>
  );
};

export default ConfirmOtp;
