import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const SearchPath = ({
  showModal,
  setShowModal,
  subCategory,
  category,
  searchValue,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h6>{t("continueSearchIn")}</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2">
          <Link
            className="pathLink"
            to={`/services?${
              subCategory ? `sub_categories=${subCategory?.id}` : ""
            }${category ? `categories=${category?.id}` : ""}${
              searchValue ? `search=${searchValue}` : ""
            }`}
          >
            {t("servicesLink")}
          </Link>

          <Link
            className="pathLink"
            to={`/projects?${
              subCategory ? `sub_categories=${subCategory?.id}` : ""
            }${category ? `categories=${category?.id}` : ""}${
              searchValue ? `search=${searchValue}` : ""
            }`}
          >
            {t("projectsLink")}
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchPath;
