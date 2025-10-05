import { useParams } from "react-router-dom";
import { useState } from "react";
import useGetFaqs from "../../hooks/faqs/useGetFaqs";
import DataLoader from "../../ui/DataLoader";
import ErrorPage from "../ErrorPage";
import { useTranslation } from "react-i18next";

export default function FaqDetails() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { data, isLoading, error } = useGetFaqs();

  const [reaction, setReaction] = useState(null);

  if (isLoading) return <DataLoader />;
  if (error || !data) return <ErrorPage />;

  let faqHelp = null;
  data.forEach((category) => {
    category.faqs.forEach((faq) => {
      if (faq.help?.slug === slug) {
        faqHelp = faq.help;
      }
    });
  });

  if (!faqHelp) return <ErrorPage />;

  const userReaction = reaction ?? faqHelp.react;

  const handleLike = () => {
    setReaction(userReaction === "like" ? null : "like");
  };

  const handleDislike = () => {
    setReaction(userReaction === "dislike" ? null : "dislike");
  };

  return (
    <div className="faq-details">
      <h2 className="faq-details-title">{faqHelp.name}</h2>
      <p className="description">{faqHelp.description}</p>

      <div
        className="faq-details-content"
        dangerouslySetInnerHTML={{ __html: faqHelp.html }}
      />

      {/* <div className="faq-details-actions">
        <span className="likes-count">
          <i className="fa-regular fa-thumbs-up"></i> {faqHelp.like_count ?? 0}
        </span>
        <span className="dislikes-count">
          <i className="fa-regular fa-thumbs-down"></i> {faqHelp.dislike_count ?? 0}
        </span>
      </div> */}

      <div className="faq-details-buttons">
        <button
          className={`like ${userReaction === "like" ? "active" : ""}`}
          onClick={handleLike}
        >
          <i className="fa-regular fa-thumbs-up"></i> {t("helpCenter.useful")}
        </button>
        <button
          className={`dislike ${userReaction === "dislike" ? "active" : ""}`}
          onClick={handleDislike}
        >
          <i className="fa-regular fa-thumbs-down"></i>{" "}
          {t("helpCenter.notUseful")}
        </button>
      </div>
    </div>
  );
}
