import { useTranslation } from "react-i18next";
import { Link } from "react-router";
export default function JoinYnjz() {
  const { t } = useTranslation();

  return (
    <section className="join-ynjz">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 co-12 p-2">
            <div className="content">
              <h2>{t("home.joinYnjez")}</h2>
              <p>{t("home.joinYnjezDesc")}</p>
              <Link to="/register">{t("home.joinNow")}</Link>
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="img">
              <img src="/images/join.png" alt="join" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
