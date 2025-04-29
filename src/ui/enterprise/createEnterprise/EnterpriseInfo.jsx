import { useTranslation } from "react-i18next";

const EnterpriseInfo = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("enterprise.createenterprise.whatIs.title"),
      content: t("enterprise.createenterprise.whatIs.content"),
    },
    {
      title: t("enterprise.createenterprise.forWhom.title"),
      content: t("enterprise.createenterprise.forWhom.content"),
    },
    {
      title: t("enterprise.createenterprise.benefits.title"),
      content: null,
      list: t("enterprise.createenterprise.benefits.list", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div className="enterprise-info">
      {sections.map((section, idx) => (
        <div key={idx} className="section">
          <h2>{section.title}</h2>
          {section.content && <p>{section.content}</p>}
          {section.list && (
            <ul>
              {section.list.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default EnterpriseInfo;
