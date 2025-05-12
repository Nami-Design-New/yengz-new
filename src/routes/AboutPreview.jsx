import React from "react";
import useGetAboutData from "../hooks/about/useGetAboutData";
import DataLoader from "../ui/DataLoader";
import ErrorPage from "./ErrorPage";

const AboutPreview = () => {
  const { data, isLoading } = useGetAboutData();
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  if (isLoading) {
    <DataLoader />;
  }
  if (!isLoading && !data) {
    return <ErrorPage />;
  }
  return (
    <section className="faqs">
      <div className="container">
        <div dangerouslySetInnerHTML={renderHTML(data?.html)} />
      </div>
    </section>
  );
};

export default AboutPreview;
