import React from "react";
import SectionTitle from "./SectionTitle";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const faqData = [
  {
    id: 1,
    questionKey: "enterprise.faq.questions.q1",
    answerKey: "enterprise.faq.answers.a1",
  },
  {
    id: 2,
    questionKey: "enterprise.faq.questions.q2",
    answerKey: "enterprise.faq.answers.a2",
  },
  {
    id: 3,
    questionKey: "enterprise.faq.questions.q3",
    answerKey: "enterprise.faq.answers.a3",
  },
  {
    id: 4,
    questionKey: "enterprise.faq.questions.q4",
    answerKey: "enterprise.faq.answers.a4",
  },
  {
    id: 5,
    questionKey: "enterprise.faq.questions.q5",
    answerKey: "enterprise.faq.answers.a5",
  },
];

const Faq = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);

  return (
    <section className="faq-enterprsie section-padding">
      <div className="container">
        <SectionTitle title={"enterprise.faq.title"} />
        <Accordion defaultActiveKey="0" alwaysOpen>
          {faqData.map((item) => (
            <Accordion.Item eventKey={item.id.toString()} key={item.id}>
              <Accordion.Header className={lang === "en" ? "en" : ""}>
                {t(item.questionKey)}
              </Accordion.Header>
              <Accordion.Body>{t(item.answerKey)}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
