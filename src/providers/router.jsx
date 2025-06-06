import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoutes";
// Layouts
import RootLayout from "../layout/RootLayout";
import EnterpriseLayout from "../layout/EnterpriseLayout";

// Common
import ErrorPage from "../routes/ErrorPage";
import Home from "../routes/Home";
import Contact from "../routes/Contact";
import Terms from "../routes/Terms";
import Privacy from "../routes/Privacy";

// Auth
import Login from "../routes/Login";
import Register from "../routes/Register";
import ForgetPassword from "../routes/ForgetPassword";

// Categories

import Categories from "../routes/Categories";
import SubCategories from "../routes/SubCategories";

// Services
import Services from "../routes/Services";
import ServiceDetails from "../routes/ServiceDetails";
import AddServices from "../routes/AddServices";
import Cart from "../routes/Cart";
import Purchases from "../routes/Purchases";
import OrderDetails from "../routes/OrderDetails";
import RecievedOrders from "../routes/RecievedOrders";

// Projects
import Projects from "../routes/Projects";
import ProjectDetails from "../routes/ProjectDetails";
import AddProject from "../routes/AddProject";
import ProjectsOrders from "../routes/ProjectsOrders";
import ProjectsOrdersDetails from "../routes/ProjectsOrdersDetails";

// Profile
import Profile from "../routes/Profile";
import EditProfile from "../routes/EditProfile";
import VerifyPhone from "../routes/VerifyPhone";
import VerifyIdentity from "../routes/VerifyIdentity";
import MyCollections from "../routes/MyCollections";
import MyCollection from "../routes/MyCollection";
import MyBids from "../routes/MyBids";
import MyBidDetails from "../routes/MyBidDetails";
import Chats from "../routes/Chats";
import Notifcations from "../routes/Notifcations";
import Balance from "../routes/Balance";
import ManageAccounts from "../routes/ManageAccounts";

// Community
import CommunityPosts from "../routes/CommunityPosts";
import CommunitySubjectDetails from "../routes/CommunitySubjectDetails";

// Freelancers
import BestFreeLancers from "../routes/BestFreeLancers";
import Portfolios from "../routes/Portfolios";

// Support
import Complaints from "../routes/Complaints";

// Static
import About from "../routes/About";
import AboutPreview from "../routes/AboutPreview";
import Blogs from "../routes/Blogs";
import BlogDetails from "../routes/BlogDetails";

// Enterprise
import Enterprise from "../routes/enterprise/Enterprise";
import CreateEnterprise from "../routes/enterprise/CreateEnterprise";
import Teams from "../routes/enterprise/Teams";
import EditEnterprise from "../routes/enterprise/EditEnterprise";
import FundSource from "../routes/enterprise/FundSource";
import EnterpriseDetails from "../routes/enterprise/EnterpriseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      // Auth

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },

      // Categories
      {
        path: "categories",
        children: [
          { index: true, element: <Categories /> },
          { path: ":id", element: <SubCategories /> },
        ],
      },

      // Services
      {
        path: "services",
        children: [
          { index: true, element: <Services /> },
          { path: ":id", element: <ServiceDetails /> },
        ],
      },
      {
        path: "service",
        children: [
          {
            path: "add",
            element: (
              <PrivateRoute>
                <AddServices />
              </PrivateRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <PrivateRoute>
                <AddServices />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "purchases",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Purchases />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "recieved-orders",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <RecievedOrders />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Projects
      {
        path: "projects",
        children: [
          { index: true, element: <Projects /> },
          { path: ":id", element: <ProjectDetails /> },
        ],
      },
      {
        path: "project",
        children: [
          {
            path: "add",
            element: (
              <PrivateRoute>
                <AddProject />
              </PrivateRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <PrivateRoute>
                <AddProject />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "projects-orders",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <ProjectsOrders />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <ProjectsOrdersDetails />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Profile
      {
        path: "profile",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
          { path: ":id", element: <Profile /> },
        ],
      },
      {
        path: "edit-profile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "verify-phone",
        element: (
          <PrivateRoute>
            <VerifyPhone />
          </PrivateRoute>
        ),
      },
      {
        path: "verify-identity",
        element: (
          <PrivateRoute>
            <VerifyIdentity />
          </PrivateRoute>
        ),
      },

      // Collections
      {
        path: "my-collections",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <MyCollections />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <MyCollection />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Bids, Chat, Notifications
      {
        path: "bids",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <MyBids />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <PrivateRoute>
                <MyBidDetails />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "chat",
        element: (
          <PrivateRoute>
            <Chats />
          </PrivateRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <PrivateRoute>
            <Notifcations />
          </PrivateRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoute>
            <Balance />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-accounts",
        element: (
          <PrivateRoute>
            <ManageAccounts />
          </PrivateRoute>
        ),
      },

      // Community
      {
        path: "community",
        children: [
          { path: ":name", element: <CommunityPosts /> },
          { path: ":name/:id", element: <CommunitySubjectDetails /> },
        ],
      },

      // Freelancers
      { path: "freelancers", element: <BestFreeLancers /> },
      { path: "portfolios", element: <Portfolios /> },

      // Support
      {
        path: "complaints-suggestions",
        element: (
          <PrivateRoute>
            <Complaints />
          </PrivateRoute>
        ),
      },
      { path: "contact", element: <Contact /> },

      // Static
      {
        path: "about",
        children: [
          { path: ":id", element: <About /> },
          { path: "preview/:id", element: <AboutPreview /> },
        ],
      },
      {
        path: "blogs",
        children: [
          { index: true, element: <Blogs /> },
          { path: ":id", element: <BlogDetails /> },
        ],
      },
      { path: "privacy-policy", element: <Privacy /> },
      { path: "terms-conditions", element: <Terms /> },

      // Enterprise
      {
        path: "enterprise",
        children: [
          { index: true, element: <Enterprise /> },
          { path: "create", element: <CreateEnterprise /> },
        ],
      },
      {
        path: "orgs/:link",
        element: <EnterpriseLayout />,
        children: [
          { index: true, element: <EnterpriseDetails /> },
          { path: "teams", element: <Teams /> },
          { path: "edit", element: <EditEnterprise /> },
          { path: "funding", element: <FundSource /> },
        ],
      },
    ],
  },
]);

export default router;
