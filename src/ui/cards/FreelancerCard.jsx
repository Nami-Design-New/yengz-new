import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import StarsList from "../StarList";

function FreelancerCard({ freelancer, truncate }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/profile/${freelancer?.id}`} className="freelancerCard">
      <div className="d-flex justify-content-between">
        <div className="info">
          <div className="img">
            <img
              src={imgError ? "/icons/avatar.jpg" : freelancer.image}
              alt={freelancer?.name}
              onError={() => setImgError(true)}
            />
            {freelancer?.verified === 1 && (
              <span className="status">
                <i className="fa-regular fa-check"></i>
              </span>
            )}
          </div>
          <div className="content">
            <h6>{freelancer?.name}</h6>
            <ul>
              <li>
                <i className="fa-regular fa-cubes"></i> {t("servicesCount")}:{" "}
                {freelancer?.service_count}
              </li>
            </ul>
          </div>
        </div>
        <StarsList rate={freelancer?.rate} />
      </div>
      <p>{truncate(freelancer?.about)}</p>
    </Link>
  );
}

export default FreelancerCard;
