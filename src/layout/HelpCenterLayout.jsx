import { Outlet, ScrollRestoration } from "react-router";
import HelpCenterSidebar from "../ui/helpCenter/HelpCenterSidebar";
import HelpCenterSearch from "../ui/helpCenter/HelpCenterSearch";

export default function HelpCenterLayout() {
  return (
    <>
      <ScrollRestoration />
      <div className="help-center-layout">
        <div className="row">
          <HelpCenterSidebar />

          <div className="col-lg-9 col-md-8 col-12 p-0">
            <div className="container">
              <HelpCenterSearch  />
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
