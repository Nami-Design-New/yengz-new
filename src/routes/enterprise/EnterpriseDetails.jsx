import React from "react";
import { useTranslation } from "react-i18next";
// Import reusable components
import ProjectStatus from "../../ui/enterprise/stats/ProjectStatus";
import ProjectSummary from "../../ui/enterprise/stats/ProjectSummary";
import MetricsBox from "../../ui/enterprise/stats/MetricsBox";
import FinancialInfo from "../../ui/enterprise/stats/FinancialInfo";
import { useNavigate, useParams } from "react-router";
import useGetCompanyDetails from "../../hooks/orgs/useGetCompanyDetails";
import DataLoader from "../../ui/DataLoader";

const EnterpriseDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { link } = useParams();
  const { data: companyDetailsData, isLoading } = useGetCompanyDetails(link);

  // Handle add member click
  const handleAddProjectClick = () => {
    navigate(`/project/add?org=${link}`);
  };

  // console.log("companyDetailsData enter prise details", companyDetailsData);

  if (isLoading) {
    return <DataLoader />;
  }

  if (!isLoading && !companyDetailsData) {
    return <ErrorPage />;
  }
  // Define status list for project status components
  const statusList = ["draft", "open", "inReview", "inProgress" , "completed" , "closed" , "rejected" , "archived"];

  // Sample stats data (would typically come from an API)
  const stats = {
    draft: {
      count: companyDetailsData.under_review_projects,
      percent: companyDetailsData.under_review_projects,
    },
    open: {
      count: companyDetailsData.in_progress_projects,
      percent: companyDetailsData.in_progress_projects,
    },
    inReview: {
      count: companyDetailsData.finished_projects,
      percent: companyDetailsData.finished_projects,
    },
    inProgress: {
      count: companyDetailsData.under_review_projects,
      percent: companyDetailsData.under_review_projects,
    },
    completed: {
      count: companyDetailsData.finished_projects,
      percent: companyDetailsData.finished_projects,
    },
    closed: {
      count: companyDetailsData.canceled_projects,
      percent: companyDetailsData.canceled_projects,
    },
    rejected: {
      count: companyDetailsData.rejected_projects,
      percent: companyDetailsData.rejected_projects,
    },
    archived: {
      count: companyDetailsData.rejected_projects,
      percent: companyDetailsData.rejected_projects,
    },
  };
  return (
    <div className="dashboard">
      <div className="projects">
        {/* First project status component */}
        <ProjectStatus statusList={statusList} stats={stats} />

        {/* Second project status component (could be for different project types) */}
        {/* <ProjectStatus statusList={statusList} stats={stats} /> */}

        {/* Project summary component */}
        <ProjectSummary
          totalProjects={4}
          buttonText={t("enterprise.orgs.addProject")}
          buttonIcon={<i className="fa-regular fa-plus"></i>}
          onAddClick={handleAddProjectClick}
          title="enterprise.details.projects"
          companyDetailsData={companyDetailsData}
        />
      </div>

      {/* Metrics component for members, messages, etc. */}
      <MetricsBox companyDetailsData={companyDetailsData} />

      {/* Financial information component */}
      <FinancialInfo companyDetailsData={companyDetailsData} />
    </div>
  );
};

export default EnterpriseDetails;
