import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ProjectStatus = ({ statusList, stats, now = 60 }) => {
  const { t } = useTranslation();

  return (
    <div className="project-status">
      {statusList.map((status) => {
        const statusData = stats[status] || { count: 0, percent: 0 };
        return (
          <div key={status}>
            <div className="status__progress-label d-flex justify-content-between align-items-center">
              <span>
                {statusData.count} {t(`status.${status}`, status)}
              </span>
              <span>{statusData.percent} %</span>
            </div>
            <ProgressBar
              now={statusData.percent || now}
              label={`${statusData.percent || now}%`}
              visuallyHidden
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectStatus;
