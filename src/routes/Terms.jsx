import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/DataLoader";
import SectionHeader from "../ui/SectionHeader";

export default function Terms() {
  const { data: settings, isLoading } = useGetSettings();
  const renderHTML = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <>
      <SectionHeader />
      <section className="faqs">
        <div className="container">
          {isLoading ? (
            <div>
              <DataLoader />
            </div>
          ) : (
            <div dangerouslySetInnerHTML={renderHTML(settings?.data?.terms)} />
          )}
        </div>
      </section>
    </>
  );
}
