import { useTranslation } from "react-i18next";

function RatingFilterBox({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <ul className="rate-range">
      <h6>{t("search.rate")}</h6>
      <li>
        <input
          type="radio"
          name="rate"
          id="rate-5"
          value={5}
          checked={+value === 5}
          onChange={onChange}
        />
        <ul className="stars">
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
        </ul>
      </li>
      <li>
        <input
          type="radio"
          name="rate"
          id="rate-4"
          value={4}
          checked={+value === 4}
          onChange={onChange}
        />

        <ul className="stars">
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
        </ul>
        <span>{t("orMore")}</span>
      </li>
      <li>
        <input
          type="radio"
          name="rate"
          id="rate-3"
          value={3}
          checked={+value === 3}
          onChange={onChange}
        />
        <ul className="stars">
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
        </ul>
        <span>{t("orMore")}</span>
      </li>
      <li>
        <input
          type="radio"
          name="rate"
          id="rate-2"
          value={2}
          checked={+value === 2}
          onChange={onChange}
        />
        <ul className="stars">
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
        </ul>
        <span>{t("orMore")}</span>
      </li>
      <li>
        <input
          type="radio"
          name="rate"
          id="rate-1"
          value={1}
          checked={+value === 1}
          onChange={onChange}
        />
        <ul className="stars">
          <li className="star">
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
          </li>
        </ul>
        <span>{t("orMore")}</span>
      </li>
    </ul>
  );
}

export default RatingFilterBox;
