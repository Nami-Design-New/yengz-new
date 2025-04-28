import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import Login from "./../routes/Login";
import { Enterprise } from "../routes/Enterprise";

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
        path: "/enterprise",
        element: <Enterprise />,
      },
    ],
  },
]);
