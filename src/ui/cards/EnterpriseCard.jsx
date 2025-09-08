import React from "react";
import { Link } from "react-router";

const EnterpriseCard = () => {
  return (
    <Link to="1" className="enterprise--card">
      <img src="/images/enterprise/organization_default.png" />
      <div className="enterprise--card__info">
        <h3>Name</h3>
        <ul className="info--stats">
          <li>
            <i class="fa-solid fa-folder-open"></i>
            <span>1 مشروع</span>
          </li>
          <li>
            <i className="fa-solid fa-table"></i>
            <span>1 فريق</span>
          </li>
          <li>
            <i className="fa-solid fa-users"></i>
            <span>1 مستخدمين</span>
          </li>
        </ul>
        <p>شركه تقدم خدمات برمجيه</p>
      </div>
    </Link>
  );
};

export default EnterpriseCard;
