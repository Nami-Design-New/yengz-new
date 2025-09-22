import { Outlet, ScrollRestoration } from "react-router";
import HelpCenterSidebar from "../ui/helpCenter/HelpCenterSidebar";

export default function HelpCenterLayout() {
  return (
    <>
      <ScrollRestoration />
      <div className="help-center-layout">
        <div className="row">
          <HelpCenterSidebar />

          <div className="col-lg-9 col-md-8 col-12 p-0">
            <div className="container">
              <div className="help-center-searchbar">
                <input type="text" placeholder="ابحث في مركز المساعدة..." />
              </div>

              <div className="help-center-page">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
