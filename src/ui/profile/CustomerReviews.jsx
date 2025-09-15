import React from "react";

export default function CustomerReviews({ reviews = [], t }) {
  const ratingFields = [
    { key: "work_rate", label: t("profile.professionalism") },
    { key: "support_rate", label: t("profile.communication") },
    { key: "quality_rate", label: t("profile.quality") },
    { key: "experience_rate", label: t("profile.experience") },
    { key: "time_rate", label: t("profile.onTimeDelivery") },
    { key: "deal_again_rate", label: t("profile.dealAgain") },
  ];

  return (
   <div className="customer-reviews">
  <h5 className="mb-3">{t("profile.customerReviews")}</h5>
  {reviews.length > 0 ? (
    reviews.map((rate) => {
      const reviewer = rate.rated_user || {};

      let reviewType = "";
      if (rate.service_id) {
        reviewType = t("profile.reviewOnService");
      } else if (rate.project_id) {
        reviewType = t("profile.reviewOnProject");
      } else {
        reviewType = t("profile.review");
      }

      return (
        <div key={rate.id} className="review-card border rounded p-3 mb-3">
          <div className="mb-2 fw-bold">{reviewType}</div>

          <ul className="ratings-list mb-2">
            {ratingFields.map((field) => (
              <li
                key={field.key}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{field.label}</span>
                <span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star me-1 ${
                        i < Math.round(rate[field.key] || 0)
                          ? "fa-solid text-warning"
                          : "fa-regular text-gray"
                      }`}
                    ></i>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <div className="review-user d-flex align-items-center mb-2">
            <img
              src={reviewer.image || "/images/avatar-placeholder-2.svg"}
              alt={reviewer.name }
              className="review-user-image rounded-circle me-2"
            />
            <div>
              <strong>{reviewer.name || "null"}</strong>
              <div className="review-date text-muted">
                {new Date(rate.created_at).toLocaleDateString()}
              </div>              
            </div>
          </div>

          <p className="mb-0 text-muted">{rate.comment}</p>
        </div>
      );
    })
  ) : (
    <p className="text-muted">{t("profile.noReviews")}</p>
  )}
</div>

  );
}
