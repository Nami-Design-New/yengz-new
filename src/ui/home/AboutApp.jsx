import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function AboutApp() {
  const { t } = useTranslation();
  return (
    <>
      <section className="video_section">
        <div className="container">
          <div className="row m-0 gap-3">
            <div className="col-lg-5 col-12 p-2">
              <div className="video_wrapper">
                <img src="/images/poster.png" alt="poster" />
                <button>
                  <img src="/images/play.svg" alt="play" />
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h2 className="mb-5">{t("home.doYouhaveProject")}</h2>
                <h3>
                  <img src="/images/addProject.svg" alt="icon" />
                  {t("home.addProject")}
                </h3>
                <p className="mb-4">{t("home.addProjectDesc")}</p>
                <h3>
                  <img src="/images/savePayments.svg" alt="icon" />
                  {t("home.savePayment")}
                </h3>
                <p>{t("home.savePaymentDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="show_creativity">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h2>{t("home.showCreativity")}</h2>
                <h4>{t("home.showCreativityDesc")}</h4>
                <p>{t("home.showCreativityDesc2")}</p>
                <Link to="/login" className="link">
                  {t("home.joinNow")}
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="img">
                <img src="/images/lap.png" alt="lap" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
