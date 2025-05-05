import React from "react";
import TeamHeader from "./TeamHeader";
import RoleDescription from "./RoleDescription";
import UserList from "./UserList";

const TeamCard = ({
  title,
  projects,
  budget,
  roleDescription,
  canDelete = true,
}) => {
  return (
    <div className="enterprise-team__card">
      <TeamHeader
        title={title}
        projects={projects}
        budget={budget}
        canDelete={canDelete}
      />
      <RoleDescription description={roleDescription} />
      <UserList />
    </div>
  );
};

export default TeamCard;
