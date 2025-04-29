import { useLocation } from "react-router";

const arabicRoutes = {
  home: "الرئيسية",
  enterprise: "المؤسسات",
  create: "أنشئ مؤسسة",
  dashboard: "لوحة التحكم",
  projects: "المشاريع",
  // Extend with more translations as needed
};

const formatPath = (segment) => arabicRoutes[segment] || segment;

const PageHeader = ({ showHome = true, removeLast = false }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const fullSegments = showHome ? ["home", ...pathSegments] : [...pathSegments];
  const breadcrumbSegments = removeLast
    ? fullSegments.slice(0, -1)
    : fullSegments;
  const pageTitle = formatPath(pathSegments[pathSegments.length - 1]);

  return (
    <div className="page-header">
      <div className="breadcrumb">
        {breadcrumbSegments.map((seg, index) => (
          <span key={index}>
            {formatPath(seg)}
            {index < breadcrumbSegments.length - 1 && " / "}
          </span>
        ))}
      </div>
      <h1 className="page-title">{pageTitle}</h1>
    </div>
  );
};

export default PageHeader;
