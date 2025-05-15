// Update mutation

import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services/apiProfile";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setUser } from "../../redux/slices/authedUser";
import { useNavigate } from "react-router";

export const useEditProfile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success(t("profile.profileEditedSuccessfully"));
        dispatch(setUser(data.data));
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Update profile error:", error);
      toast.error(error.message);
    },
  });

  return { editProfile, isPending };
};
