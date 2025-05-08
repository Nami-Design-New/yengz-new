import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section className="how_it_works">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <h2 className="title">{t("home.howItWorks")}</h2>
            <p className="desc">{t("home.howItWorksDesc")}</p>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">1</div>
                <h6>{t("howItWorks.title1")}</h6>
              </div>
              <p>{t("howItWorks.desc1")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">2</div>
                <h6>{t("howItWorks.title2")}</h6>
              </div>
              <p>{t("howItWorks.desc2")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">3</div>
                <h6>{t("howItWorks.title3")}</h6>
              </div>
              <p>{t("howItWorks.desc3")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">4</div>
                <h6>{t("howItWorks.title4")}</h6>
              </div>
              <p>{t("howItWorks.desc4")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">5</div>
                <h6>{t("howItWorks.title5")}</h6>
              </div>
              <p>{t("howItWorks.desc5")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="icon">6</div>
                <h6>{t("howItWorks.title6")}</h6>
              </div>
              <p>{t("howItWorks.desc6")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
