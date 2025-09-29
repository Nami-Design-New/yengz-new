import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetHelpDetails from "../../hooks/help/useGetHelpDetails";
import useHelpReact from "../../hooks/help/useHelpReact";
import DataLoader from "../../ui/DataLoader";

const HelpCenterDetails = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetHelpDetails(slug);
  const { handleHelpReact } = useHelpReact();

  const [reaction, setReaction] = useState(null);


  useEffect(() => {
    if (data?.react !== undefined && data?.react !== null) {
      setReaction(data.react);
    }
  }, [data]);

  if (isLoading) return <DataLoader />;

  const sendReaction = (newReaction) => {
    handleHelpReact({
      slug: slug,
      type: newReaction,
    });
  };

  const handleLike = () => {
    if (reaction === "like") {
      setReaction(null);
      sendReaction(null);
    } else {
      setReaction("like");
      sendReaction("like");
    }
  };

  const handleDislike = () => {
    if (reaction === "dislike") {
      setReaction(null);
      sendReaction(null);
    } else {
      setReaction("dislike");
      sendReaction("dislike");
    }
  };
  console.log(data);

  return (
    <section className="container py-4">
      {data ? (
        <>
          <h2>{data.name}</h2>
          <p>{data.description}</p>

          <div className="faq-details-buttons mt-3 d-flex gap-2">
            <button
              className={`btn ${
                reaction === "like" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={handleLike}
            >
              <i className="fa-regular fa-thumbs-up"></i> مقال مفيد
            </button>
            <button
              className={`btn ${
                reaction === "dislike" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={handleDislike}
            >
              <i className="fa-regular fa-thumbs-down"></i> مقال غير مفيد
            </button>
          </div>
        </>
      ) : (
        <p>لا توجد تفاصيل لهذا الموضوع</p>
      )}
    </section>
  );
};

export default HelpCenterDetails;
