import { Link } from "react-router";

const UserList = ({ members ,id}) => {
  console.log("members", members);

  return (
    <Link to={`${id}/members`} className="enterprise-team__user-list mt-2">
      {members.map((member) => (
        <img
          key={member.id}
          src={member.user.image}
          alt={member.user.name}
          className="enterprise-team__image"
        />
      ))}
    </Link>
  );
};

export default UserList;
