import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Register from "../routes/Register";
import CreateEnterprise from "../routes/enterprise/CreateEnterprise";
import Teams from "../routes/enterprise/Teams";
import EditEnterprise from "../routes/enterprise/EditEnterprise";
import FundSource from "../routes/enterprise/FundSource";
import Enterprise from "../routes/enterprise/Enterprise";
import EnterpriseLayout from "../layout/EnterpriseLayout";
import EnterpriseDetails from "../routes/enterprise/EnterpriseDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/enterprise",
        element: <Enterprise />,
      },
      {
        path: "/enterprise/create",
        element: <CreateEnterprise />,
      },
      {
        path: "/orgs/:link/",
        element: <EnterpriseLayout />,
        children: [
          {
            index: true,
            element: <EnterpriseDetails />,
          },
          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "edit",
            element: <EditEnterprise />,
          },
          {
            path: "funding",
            element: <FundSource />,
          },
        ],
      },
    ],
  },
]);
