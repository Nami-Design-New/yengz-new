import React from "react";
import { Link } from "react-router";

const RoleDescription = ({ description , id }) => {
  return <Link to={`${id}/members`}><p className="enterprise-team__role-description">{description}</p></Link>;
};

export default RoleDescription;
