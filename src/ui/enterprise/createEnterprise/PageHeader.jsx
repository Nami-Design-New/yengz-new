import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const formatPath = (segment, t) => {
  const routeMap = {
    home: t("navbar.ynjez", "About Ynjez"),
    enterprise: t("navbar.enterprise", "Enterprises"),
    orgs: t("navbar.enterprise", "Enterprises"),
    create: t("enterprise.hero.link", "Create a Company"),
    dashboard: t("enterprise.details.dashboard", "Dashboard"),
    projects: t("enterprise.details.projects", "Projects"),
  };

  return routeMap[segment] || segment;
};

const PageHeader = ({ showHome = true, removeLast = false }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const fullSegments = showHome ? ["home", ...pathSegments] : [...pathSegments];
  const breadcrumbSegments = removeLast
    ? fullSegments.slice(0, -1)
    : fullSegments;
  const pageTitle = formatPath(pathSegments[pathSegments.length - 1], t);

  return (
    <div className="page-header">
      <div className="breadcrumb">
        {breadcrumbSegments.map((seg, index) => (
          <span key={index}>
            {formatPath(seg, t)}
            {index < breadcrumbSegments.length - 1 && " / "}
          </span>
        ))}
      </div>
      <h1 className="page-title">{pageTitle}</h1>
    </div>
  );
};

export default PageHeader;
