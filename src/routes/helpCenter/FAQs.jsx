import useGetFaqs from "../../hooks/faqs/useGetFaqs";
import { Link } from "react-router";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";
import { useTranslation } from "react-i18next";

export default function FAQs() {
    const { t } = useTranslation();
  
  const { data, isLoading } = useGetFaqs();
  if (isLoading) {
    <DataLoader />;
  }
  if (!isLoading && !data) {
    return <ErrorPage />;
  }
 
  return (
    <div className="faq-page">
      <h1> {t('helpCenter.title')}</h1>

      {data?.map((category) => (
        <div key={category.id} className="faq-category">
          <h2 className="faq-title">{category.name}</h2>

          <div className="faq-list">
            {category.faqs.map((faq) => (
              <Link
                to={`/help-center/details/${faq.help.slug}`}
                className="faq-link"
                key={faq.id}
              >
                {faq.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
