import { useTranslation } from "react-i18next";

export default function WhyYenjz() {
  const { t } = useTranslation();

  return (
    <section className="how_it_works">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <h2 className="title">{t("home.whyYenjz")}</h2>
            <p className="desc">{t("home.whyYenjzDesc")}</p>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/1.svg" alt="icon1" />
                </div>
                <h6>{t("whyYenjz.title1")}</h6>
              </div>
              <p>{t("whyYenjz.desc1")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/2.svg" alt="icon1" />
                </div>
                <h6>{t("whyYenjz.title2")}</h6>
              </div>
              <p>{t("whyYenjz.desc2")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/3.svg" alt="icon3" />
                </div>
                <h6>{t("whyYenjz.title3")}</h6>
              </div>
              <p>{t("whyYenjz.desc3")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/4.svg" alt="icon4" />
                </div>
                <h6>{t("whyYenjz.title4")}</h6>
              </div>
              <p>{t("whyYenjz.desc4")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/5.svg" alt="icon5" />
                </div>
                <h6>{t("whyYenjz.title5")}</h6>
              </div>
              <p>{t("whyYenjz.desc5")}</p>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="feature_card">
              <div className="d-flex align-items-center gap-3">
                <div className="img">
                  <img src="/icons/6.svg" alt="icon6" />
                </div>
                <h6>{t("whyYenjz.title6")}</h6>
              </div>
              <p>{t("whyYenjz.desc6")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
