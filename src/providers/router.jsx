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
        children: [
          {
            index: true,
            element: <Teams />,
          },
          {
            path: "edit",
            element: <EditEnterprise />,
          },
          {
            index: "funding",
            element: <FundSource />,
          },
        ],
      },
    ],
  },
]);
