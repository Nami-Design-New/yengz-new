import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/SectionHeader";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeader />
      <section className="contact-section">
        <div className="container mtb-64">
          <div className="row">
            <div className="col-lg-6 col-12 p-3">
              <div className="shaded-card" data-aos="fade-up">
                <form className="container" action="">
                  <div className="row">
                    <div className="col-12 p-2">
                      <h1>{t("contact.title")}</h1>
                      <p>{t("contact.description")}</p>
                    </div>
                    <div className="col-12 p-2 input-filed">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={t("contact.namePlaceholder")}
                      />
                    </div>
                    <div className="col-12 p-2 input-filed">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={t("contact.emailPlaceholder")}
                      />
                    </div>
                    <div className="col-12 p-2 input-filed">
                      <input
                        type="number"
                        name="tel"
                        id="tel"
                        placeholder={t("contact.phonePlaceholder")}
                      />
                    </div>
                    <div className="col-12 p-2 input-filed">
                      <textarea
                        name="message"
                        id="message"
                        placeholder={t("contact.messagePlaceholder")}
                      ></textarea>
                    </div>
                    <div className="col-12 p-2">
                      <button type="submit">{t("contact.submit")}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-3">
              <div className="img" data-aos="fade-up">
                <img
                  className="c-image"
                  src="/images/contact.webp"
                  alt="contact image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
