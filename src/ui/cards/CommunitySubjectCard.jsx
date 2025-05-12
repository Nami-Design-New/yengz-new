import { useTranslation } from "react-i18next";
import { formatTimeDifference, getTimeDifference } from "../../utils/helpers";
import { Link } from "react-router";

function CommunitySubjectCard({ currentRoute, post }) {
  const { t } = useTranslation();

  const publisherTimeDifference = getTimeDifference(post?.created_at);
  const publisherStartTime = formatTimeDifference(
    publisherTimeDifference.years,
    publisherTimeDifference.months,
    publisherTimeDifference.days,
    publisherTimeDifference.hours,
    publisherTimeDifference.minutes,
    t
  );

  const commentTimeDifference = getTimeDifference(
    post?.last_comment?.created_at
  );
  const commentStartTime = formatTimeDifference(
    commentTimeDifference.years,
    commentTimeDifference.months,
    commentTimeDifference.days,
    commentTimeDifference.hours,
    commentTimeDifference.minutes,
    t
  );

  return (
    <Link to={`${currentRoute}/${post?.id}`} className="subjectItem">
      <div className="subjectContent">
        <Link to={`/profile/${post?.user?.id}`} className="image-wrapper">
          <img src={post?.user?.image} alt=" Suject img" />
        </Link>
        <div className="info-wrapper">
          <h6 className="m-0">{post?.title}</h6>
          <div className="info-boxes-wrapper">
            <p className="info-box name m-0">
              <i className="fa-regular fa-user"></i>
              {post?.user?.name}
            </p>
            <p className="time info-box m-0">
              <i className="fa-regular fa-timer"></i>
              {publisherStartTime}
            </p>
          </div>
        </div>
      </div>
      {post?.last_comment && (
        <div className="userContent">
          <Link
            to={`/profile/${post.last_comment?.user?.id}`}
            className="image-wrapper"
          >
            <img src={post.last_comment?.user?.image} alt="" />
          </Link>
          <div className="info-wrapper">
            <h6 className="m-0">{post.last_comment?.user?.name}</h6>
            <div className="info-boxes-wrapper">
              <p className="time info-box m-0">
                <i className="fa-regular fa-timer"></i>
                {t("communities.lastInteract")} {commentStartTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default CommunitySubjectCard;
