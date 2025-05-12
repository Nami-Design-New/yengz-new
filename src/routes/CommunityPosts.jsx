import React, { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useCommunityPosts from "../hooks/community/useCommunityPosts";
import DataLoader from "../ui/DataLoader";
import AddSubjectModal from "../ui/modals/AddSubjectModal";
import EmptyData from "../ui/EmptyData";
import CommunitySubjectCard from "../ui/cards/CommunitySubjectCard";

const CommunityPosts = () => {
  const { name } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const { isLoading, data: posts } = useCommunityPosts(name);

  const user = useSelector((state) => state.authedUser.user);
  const navigate = useNavigate();

  function handleClickAddPost() {
    if (user) {
      setShowAddSubjectModal(true);
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <SectionHeader />
      {isLoading ? (
        <DataLoader />
      ) : posts && posts?.length > 0 ? (
        <section className="communityDetails">
          <div className="container">
            <div className="communityHeader">
              <h3>{posts[0]?.category_name}</h3>
              <button className="btn" onClick={handleClickAddPost}>
                <i className="far fa-plus"></i> {t("communities.newSubject")}
              </button>
            </div>
            <div className="content-body">
              {posts?.map((post) => (
                <CommunitySubjectCard
                  currentRoute={location.pathname}
                  key={post?.id}
                  post={post}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <EmptyData>{t("communities.noSubjects")}</EmptyData>
      )}
      <AddSubjectModal
        showModal={showAddSubjectModal}
        setShowModal={setShowAddSubjectModal}
      />
    </>
  );
};

export default CommunityPosts;
