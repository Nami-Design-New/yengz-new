import React from "react";
import TeamHeader from "./TeamHeader";
import RoleDescription from "./RoleDescription";
import UserList from "./UserList";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
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

  // const teamsData = [
  //   {
  //     id: 1,
  //     title: "المدراء",
  //     projects: t("enterprise.teams.noProjects", "لا يوجد أي مشاريع"),
  //     budget: "$0.00 من غير محدودة",
  //     roleDescription:
  //       "مدراء المؤسسة يتمتعون بصلاحيات كاملة في إدارة المشاريع وتوظيف المستقلين وإدارة الصفقات وتعديل الفرق والأعضاء وتصفح المعاملات المالية وكل ما يخص المؤسسة بشكل عام، بشكل افترضي لديهم كامل الصلاحيات ولا يمكن الحد منها أو تعديلها.",
  //     canDelete: false,
  //   },
  //   {
  //     id: 2,
  //     title: "المستخدمين",
  //     projects: t("enterprise.teams.noProjects", "لا يوجد أي مشاريع"),
  //     budget: "$0.00 من غير محدودة",
  //     roleDescription:
  //       "مستخدمين المؤسسة لديهم صلاحية إدارة المشاريع والصفقات وتوظيف المستقلين والاطلاع على التعاملات المالية التي تتم داخل فريق المستخدمين فقط، ولا يتاح لهم الاطلاع على مشاريع أو تعاملات الفريق الأخرى بالمؤسسة. وبالإمكان تعديل هذه الصلاحيات من خيار تعديل الفريق.",
  //     canDelete: true,
  //   },
  // ];

  return (
    <>
      {companyTeamData?.map((team) => (
        <div key={team.id} className="enterprise-team__card">
          <TeamHeader
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
          <RoleDescription description={team.description} />
          <UserList members={team.members} />
        </div>
      ))}
    </>
  );
};

export default TeamCard;
