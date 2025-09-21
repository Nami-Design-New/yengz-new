import React from "react";
import TeamHeader from "./TeamHeader";
import RoleDescription from "./RoleDescription";
import UserList from "./UserList";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import useGetCompanyTeam from "../../hooks/orgs/useGetCompanyTeam";
import useGetCompanyDetails from "../../hooks/orgs/useGetCompanyDetails";

const TeamCard = () => {
  const { t } = useTranslation();

  const { link } = useParams();
  const { data: companyTeamData } = useGetCompanyTeam(link);
  const { data: companyDetailsData } = useGetCompanyDetails(link);

  console.log(
    "companyTeamData =======================",
    companyTeamData,
    companyDetailsData
  );

  return (
    <>
      {companyTeamData?.map((team) => (
        <div key={team.id} className="enterprise-team__card cursor-pointer">
          <TeamHeader
            id={team.id}
            title={team.name}
            projects={
              team.projects_count === 0
                ? t("enterprise.teams.noProjects", "لا يوجد أي مشاريع")
                : team.projects_count
            }
            budget={
              team.projects_price === 0
                ? "$0.00 من غير محدودة"
                : team.projects_price
            }
            canDelete={team.can_add_members}
            canAddMembers={team.can_add_memners}
            companyDetailsData={companyDetailsData}
          />
          <RoleDescription description={team.description}  id={team.id}/>
          <UserList members={team.members}  id={team.id}/>
        </div>
      ))}
    </>
  );
};

export default TeamCard;
