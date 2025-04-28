import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import { Dropdown } from "react-bootstrap";
import i18next from "i18next";

export default function LanguageMenu() {
  const { lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);

    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  return (
    <li className="link">
      <Dropdown style={{ position: "relative" }}>
        <Dropdown.Toggle style={{ backgroundColor: "#f4f4f4" }}>
          <i className="fa-regular fa-globe"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu lang-menu">
          <Dropdown.Item>
            <div className="dropdown-item" onClick={() => handleLang("ar")}>
              <div
                className={`${
                  lang === "ar" ? "circle-filled" : "circle-outline"
                }`}
              ></div>
              عربى
            </div>
          </Dropdown.Item>

          <Dropdown.Item>
            <div className="dropdown-item" onClick={() => handleLang("en")}>
              <div
                className={`${
                  lang === "en" ? "circle-filled" : "circle-outline"
                }`}
              ></div>
              English
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}
