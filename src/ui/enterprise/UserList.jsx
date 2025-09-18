import React from "react";

const UserList = ({ members }) => {
  console.log("members", members);

  return (
    <div className="enterprise-team__user-list mt-2">
      {members.map((member) => (
        <img
          key={member.id}
          src={member.user.image}
          alt={member.user.name}
          className="enterprise-team__image"
        />
      ))}
    </div>
  );
};

export default UserList;
