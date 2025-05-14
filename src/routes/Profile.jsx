import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";
import useGetProfile from "../hooks/profile/useGetProfile";
import UserProfileCard from "../ui/profile/UserProfileCard";
import ProfileTabs from "../ui/profile/ProfileTabs";

const Profile = () => {
  const authedUser = useSelector((state) => state.authedUser.user);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { data: profile, isLoading } = useGetProfile(id);

  const isMyAccount = !id || id === String(authedUser?.id);

  useEffect(() => {
    if (isMyAccount) {
      setUser(authedUser);
    } else if (id && profile) {
      setUser(profile);
    }
  }, [isMyAccount, authedUser, profile, id]);

  if (isLoading) {
    <DataLoader />;
  }

  if (!isLoading && !user) {
    return <ErrorPage />;
  }
  return (
    <section className="profile-section container">
      <div className="row">
        <div className="col-lg-4 col-12 p-2">
          <UserProfileCard isMyAccount={isMyAccount} user={user} />
        </div>
        <div className="col-lg-8 col-12 p-2">
          <ProfileTabs isMyAccount={isMyAccount} user={user} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
