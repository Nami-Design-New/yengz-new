import React from "react";
import { useTranslation } from "react-i18next";
import TeamCard from "../../ui/enterprise/TeamCard";

const Teams = () => {
  const { t } = useTranslation();
  
  // Team data array with all team information
  const teamsData = [
    {
      id: 1,
      title: "المدراء",
      projects: t("enterprise.teams.noProjects", "لا يوجد أي مشاريع"),
      budget: "$0.00 من غير محدودة",
      roleDescription: "مدراء المؤسسة يتمتعون بصلاحيات كاملة في إدارة المشاريع وتوظيف المستقلين وإدارة الصفقات وتعديل الفرق والأعضاء وتصفح المعاملات المالية وكل ما يخص المؤسسة بشكل عام، بشكل افترضي لديهم كامل الصلاحيات ولا يمكن الحد منها أو تعديلها.",
      canDelete: false
    },
    {
      id: 2,
      title: "المستخدمين",
      projects: t("enterprise.teams.noProjects", "لا يوجد أي مشاريع"),
      budget: "$0.00 من غير محدودة",
      roleDescription: "مستخدمين المؤسسة لديهم صلاحية إدارة المشاريع والصفقات وتوظيف المستقلين والاطلاع على التعاملات المالية التي تتم داخل فريق المستخدمين فقط، ولا يتاح لهم الاطلاع على مشاريع أو تعاملات الفريق الأخرى بالمؤسسة. وبالإمكان تعديل هذه الصلاحيات من خيار تعديل الفريق.",
      canDelete: true
    }
  ];

  return (
    <section className="enterprise-team">
      {teamsData.map((team) => (
        <TeamCard 
          key={team.id}
          title={team.title}
          projects={team.projects}
          budget={team.budget}
          roleDescription={team.roleDescription}
          canDelete={team.canDelete}
        />
      ))}
    </section>
  );
};

export default Teams;
