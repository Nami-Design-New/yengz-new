import React from "react";
import { Link } from "react-router";
import useGetOrgsApp from "../../hooks/orgs/useOrgsApp";
import DataLoader from "../DataLoader";

const EnterpriseCard = () => {
  const { data: orgsData, isLoading } = useGetOrgsApp();
  // console.log("orgsData", orgsData);

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !orgsData) {
    return <ErrorPage />;
  }
  return (
    <>
      {orgsData.map((org) => (
        <Link key={org.id} to={`${org.user_name}`} className="enterprise--card">
          <img src={org.image} />
          <div className="enterprise--card__info">
            <h3>{org.name}</h3>
            <ul className="info--stats">
              <li>
                <i class="fa-solid fa-folder-open"></i>
                <span>{org.projects_count} مشروع</span>
              </li>
              <li>
                <i className="fa-solid fa-table"></i>
                <span>{org.teams_count} فريق</span>
              </li>
              <li>
                <i className="fa-solid fa-users"></i>
                <span>{org.members_count} مستخدمين</span>
              </li>
            </ul>
            <p>{org.user_name}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default EnterpriseCard;
