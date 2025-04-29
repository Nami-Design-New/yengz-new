import React from "react";
import SectionTitle from "./SectionTitle";
import { Accordion } from "react-bootstrap";

const faqData = [
  {
    id: 1,
    question: "ما هو ينجز للمؤسسات؟",
    answer:
      "حل مخصص للشركات والمؤسسات لتغطية احتياجاتها من المهارات وتمكين فريقها من توظيف مستقلين محترفين عبر نظام متكامل يسهل عملية تنظيم وتوظيف المستقلين وإدارة المشاريع.",
  },
  {
    id: 2,
    question: "ما الفرق بين مستقل ومستقل للمؤسسات؟",
    answer:
      "كصاحب مشروع يتيح لك مستقل إنجاز أعمالك الشخصية والتوظيف وإدارة المشاريع بنفسك، بينما كصاحب مؤسسة ستتمكن من إضافة فريقك للمشاركة في توظيف المستقلين وإدارة المشاريع وفق صلاحيات محددة. كما يمكنك نشر مشروع بالمؤسسة وتوظيف مستقلين بنفس آلية التوظيف في مستقل إضافة إلى الاستفادة من مزايا إدارة المشاريع في المؤسسة.",
  },
  {
    id: 3,
    question: "من يمكنه إنشاء مؤسسة؟",
    answer:
      "أصحاب الشركات ومدراء الفرق والمشاريع ممن يرغبون في زيادة إنتاجية وجودة أعمالهم عبر تمكين فريق عملهم من الوصول والعمل مع أفضل الخبرات المستقلة في العالم العربي.",
  },
  {
    id: 4,
    question: "هل هناك رسوم لإنشاء مؤسسة؟",
    answer:
      "لا يوجد رسوم لإنشاء مؤسسة، يمكن للشركات إنشاء مؤسسة مجاناً من الصفحة الرئيسية للحساب في مستقل.",
  },
  {
    id: 5,
    question: "كيف استخدم مستقل للمؤسسات؟",
    answer:
      "بإنشاء مؤسسة يمكنك دعوة أعضاء شركتك وتحديد الصلاحيات ليتمكنوا من نشر المشاريع وتوظيف المستقلين، أعددنا قسم خاص بالمؤسسات في مركز المساعدة يحتوي مقالات مصورة وفيديوهات قصيرة توضح كيفية الاستخدام خطوة بخطوة، كما يمكنك التواصل معنا بأي استفسار لديك عبر نموذج التواصل بالأسفل وسنسعد بإفادتك.",
  },
];

const Faq = () => {
  return (
    <section className="faq-enterprsie section-padding">
      <div className="container">
        <SectionTitle title={"enterprise.faq.title"} />
        <Accordion defaultActiveKey="0" alwaysOpen>
          {faqData.map((item) => (
            <Accordion.Item eventKey={item.id.toString()} key={item.id}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
