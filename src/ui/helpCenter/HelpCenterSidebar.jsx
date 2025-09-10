import { NavLink, Link } from "react-router";

export default function HelpCenterSidebar() {
  return (
    <div className="col-lg-3 col-md-4 col-12 p-2">
      <aside className="help-center-sidebar">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.svg" alt="logo" />
          </Link>{" "}
        </div>
        <nav>
          <ul>
            <li className="with-divider">
              <NavLink end to="/help-center">
                <i className="fa-regular fa-lightbulb"></i>
                <span>قاعدة المعرفة</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/help-center/sellers">
                <i className="fa-regular fa-user-tie"></i>
                <span>البدء لبائعي الخدمات</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/help-center/buyers">
                <i className="fa-regular fa-cart-shopping"></i>
                <span>البدء لمشتري الخدمات</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/help-center/faqs">
                <i className="fa-regular fa-circle-question"></i>
                <span>الأسئلة الشائعة</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
