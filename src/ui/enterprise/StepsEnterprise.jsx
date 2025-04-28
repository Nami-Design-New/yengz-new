import React from "react";
import SectionTitle from "./SectionTitle";
import StepCard from "./StepCard";
const cardsData = [
  {
    id: 1,
    title: "enterprise.steps.step1.title",
    description: "enterprise.steps.step1.desc",
    icon: "/images/enterprise/how1.svg",
    number: 1,
  },
  {
    id: 2,
    title: "enterprise.steps.step2.title",
    description: "enterprise.steps.step2.desc",
    icon: "/images/enterprise/how2.svg",
    number: 2,
  },
  {
    id: 3,
    title: "enterprise.steps.step3.title",
    description: "enterprise.steps.step3.desc",
    icon: "/images/enterprise/how3.svg",
    number: 3,
  },
];
const StepsEnterprise = () => {
  return (
    <section className="steps-enterprise">
      <div className="container">
        <SectionTitle title={"enterprise.steps.title"} />
        <div className="row g-4">
          {cardsData.map((card) => (
            <div className="col-12 col-md-6 col-lg-4 p-2" key={card.id}>
              <StepCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsEnterprise;
