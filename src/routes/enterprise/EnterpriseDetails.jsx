import React from "react";
import { useTranslation } from "react-i18next";
// Import reusable components
import ProjectStatus from "../../ui/enterprise/stats/ProjectStatus";
import ProjectSummary from "../../ui/enterprise/stats/ProjectSummary";
import MetricsBox from "../../ui/enterprise/stats/MetricsBox";
import FinancialInfo from "../../ui/enterprise/stats/FinancialInfo";
import { useNavigate } from "react-router";

// Define status list for project status components
const statusList = ["draft", "open", "inReview", "inProgress"];

// Sample stats data (would typically come from an API)
const stats = {
  draft: { count: 0, percent: 0 },
  open: { count: 0, percent: 0 },
  inReview: { count: 0, percent: 0 },
  inProgress: { count: 0, percent: 0 },
  completed: { count: 0, percent: 0 },
  closed: { count: 0, percent: 0 },
  rejected: { count: 0, percent: 0 },
  archived: { count: 0, percent: 0 },
  totalProjects: 0,
  members: 1,
  messages: 3,
  freelancers: 2,
  monthlyExpenses: 0,
};

const EnterpriseDetails = () => {
  const { t } = useTranslation();

  // Prepare metrics data for MetricsBox component
  const metricsData = [
    { label: "enterprise.stats.members", value: stats.members },
    { label: "enterprise.stats.messages", value: stats.messages },
    { label: "enterprise.stats.freelancers", value: stats.freelancers },
    { label: "enterprise.stats.monthlyExpenses", value: stats.monthlyExpenses },
  ];

  // Prepare financial data
  const balanceData = {
    total: "00.00",
    available: "00.00",
  };

  const expensesData = {
    monthly: "0.00",
    pending: "0.00",
  };

  const navigate = useNavigate();

  // Handle add member click
  const handleAddProjectClick = () => {
    navigate("/project/create");
  };

  return (
    <div className="dashboard">
      <div className="projects">
        {/* First project status component */}
        <ProjectStatus statusList={statusList} stats={stats} />

        {/* Second project status component (could be for different project types) */}
        <ProjectStatus statusList={statusList} stats={stats} />

        {/* Project summary component */}
        <ProjectSummary
          totalProjects={4}
          buttonText={t("enterprise.orgs.addProject")}
          buttonIcon={<i className="fa-regular fa-plus"></i>}
          onAddClick={handleAddProjectClick}
          title="enterprise.details.projects"
        />
      </div>

      {/* Metrics component for members, messages, etc. */}
      <MetricsBox items={metricsData} />

      {/* Financial information component */}
      <FinancialInfo balanceData={balanceData} expensesData={expensesData} />
    </div>
  );
};

export default EnterpriseDetails;
