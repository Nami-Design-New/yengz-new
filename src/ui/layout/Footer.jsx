import { useTranslation } from "react-i18next";
import useGetAbout from "../../hooks/About/useGetAbout";
import useGetPaymentMethods from "../../hooks/paymentMethods/useGetPaymentMethods";
import usePopularCategories from "../../hooks/categories/usePopularCategories";
import { Link } from "react-router";
import { Accordion } from "react-bootstrap";
import useGetCommunitiesList from "../../hooks/community/useGetCommunitiesList";

export default function Footer() {
  const { data: payments } = useGetPaymentMethods();
  const { t } = useTranslation();
  const { data: footerCategoriesList } = useGetAbout();
  const { data: popularCategoriesList } = usePopularCategories();
  const { data: communities } = useGetCommunitiesList();
  return (
    <footer>
      <div className="container">
        <div className="row upper-row">
          <div className="col-lg-3 col-md-6 col-12">
            <div className="about">
              <Link to="/" className="logo">
                <img className="brand" src={"/images/logo.svg"} alt="" />
              </Link>
              <p>{t("footer.about")}</p>
            </div>
          </div>
          {footerCategoriesList && footerCategoriesList?.length > 0 && (
            <div className="col-lg-3 col-6">
              <div className="links pa-24">
                <h4>{t("footer.importantLinks")}</h4>
                <ul>
                  {footerCategoriesList.map((category) => (
                    <li key={category.id}>
                      <Link to={`/about/${category.id}`}>{category.name}</Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/blogs">{t("footer.blogs")}</Link>
                  </li>
                  <li>
                    <Link to="/terms-conditions">{t("footer.terms")}</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">{t("footer.privacy")}</Link>
                  </li>
                  <Accordion>
                    {communities && communities?.length > 0 && (
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="nav-link">
                          <span>{t("navbar.communities")}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {communities?.map((community) => (
                              <li key={community.id} className="nav-link">
                                <Link to={`/community/${community.name}`}>
                                  {community.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}
                  </Accordion>
                </ul>
              </div>
            </div>
          )}
          {popularCategoriesList && popularCategoriesList?.length > 0 && (
            <div className="col-lg-3 col-6">
              <div className="links pa-24">
                <h4>{t("footer.categories")}</h4>
                <ul className="categories_links">
                  {popularCategoriesList.map((category) => (
                    <li key={category.id}>
                      <Link to={`/services?categories=${category.category_id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="col-lg-3 col-md-6 col-12">
            <div className="d-flex flex-column gap-lg-5 gap-4 pa-24">
              <div className="download-app">
                <h4>{t("footer.dowloadApp")}</h4>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href="https://apps.apple.com/app/id6605935240"
                    >
                      <div className="text">
                        <p>App Store</p>
                      </div>
                      <div className="icon">
                        <i className="fa-brands fa-apple"></i>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=com.app.ynjez"
                    >
                      <div className="text">
                        <p>Google Play</p>
                      </div>
                      <div className="icon">
                        <i className="fa-brands fa-google-play"></i>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="follow">
                <ul>
                  <li>
                    <Link to="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center flex-lg-row flex-column mb-60">
            <div className="flex-grow-1 flex-shrink-0 flex-basis-0 copy-rights d-flex">
              <p className="mb-0">
                {t("footer.copyright")} © {new Date().getFullYear()}{" "}
                {t("footer.allRightsReserved")}
              </p>
              <div>
                {payments && payments?.length > 0 && (
                  <div className="footer-payment d-flex align-items-center h-full gap-2">
                    <span>{t("footer.acceptPaymentsBy")}:</span>
                    <div className="d-flex align-items-center gap-2">
                      {payments?.map((payment) => (
                        <img
                          src={payment.image}
                          key={payment.id}
                          alt={`payment ${payment.id}`}
                          style={{
                            width: "50px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
