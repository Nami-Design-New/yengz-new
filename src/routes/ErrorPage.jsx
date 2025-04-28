import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();

  const getErrorDetails = () => {
    if (isRouteErrorResponse(error)) {
      return {
        status: error.status,
        title: error.status === 404 ? "Page Not Found" : "Error",
        message:
          error.status === 404
            ? "We couldn't find the page you're looking for. The page might have been moved, deleted, or never existed."
            : `${error.statusText || "An error occurred"} (${error.status})`,
      };
    }

    if (error instanceof Error) {
      return {
        status: 500,
        title: "Application Error",
        message:
          error.message ||
          "An unexpected error occurred. Please try again later.",
      };
    }

    return {
      status: 500,
      title: "Unexpected Error",
      message: "An unexpected error occurred. Please try again later.",
    };
  };

  const { status, title, message } = getErrorDetails();

  return (
    <div className="error-page">
      <div className="container">
        <img src="/icons/error.svg" alt={`Error ${status}`} />

        <h1 className="error-title">
          Oops! {title} ({status})
        </h1>

        <p className="error-description">{message}</p>
        <Link
          to={location.pathname.includes("/dashboard") ? "/dashboard" : "/"}
          className="button"
        >
          Return to{" "}
          {location.pathname.includes("/dashboard") ? "Dashboard" : "Homepage"}
        </Link>
      </div>
    </div>
  );
}
