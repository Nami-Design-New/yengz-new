import React from "react";
import SectionTitle from "./SectionTitle";
import { Link } from "react-router";

const FeaturesSection = () => {
  return (
    <section className="features-enterprise section-padding">
      <div className="container">
        <SectionTitle
          title={"enterprise.features.title"}
          description={"enterprise.features.desc"}
        />
        <div className="features-block">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className="row p-90" key={index}>
                <div className="col-12 col-lg-6 p-2">
                  <div className="info">
                    <h3>إدراة المشاريع</h3>
                    <p>
                      تابع المشاريع التي تنشرها أنت أو الأعضاء في المؤسسة وتعاون
                      معهم على إدارتها والإشراف على تنفيذها حتى يتم استلامها.
                    </p>
                    <Link className="feature-link">
                      المزيد عن ادارة المشاريع
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-6 p-2">
                  <img
                    className="img-fluid"
                    src="images/enterprise/project-management.png"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
