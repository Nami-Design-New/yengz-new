import { createBrowserRouter, Outlet } from "react-router-dom";

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

//tickets
import Tickets from "../routes/tickets";
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
import Orgs from "../routes/enterprise/Orgs";
import CreateEnterpriseProject from "../ui/enterprise/projects/CreateEnterpriseProject";

// Business Solutions
import BusinessSolutions from "../routes/BusinessSolutions";
import HelpCenterLayout from "../layout/HelpCenterLayout";
import FAQs from "../routes/helpCenter/FAQs";
import KnowledgeBase from "../routes/helpCenter/KnowledgeBase";
import FaqDetails from "../routes/helpCenter/FaqDetails";
import HelpCategoryDetails from "../routes/helpCenter/KnowledgeDetails";
import Seller from "../routes/helpCenter/Seller";
import ExtraCategories from "../routes/helpCenter/ExtraCategories";
// Company Organization
import HelpCenter from "../routes/HelpCenter";
import AddTeamPage from "../routes/enterprise/AddTeamPage";
import TeamCard from "../ui/enterprise/TeamCard";
import TeamMembers from "../ui/enterprise/TeamMembers";
import UpdateTeamPage from "../routes/enterprise/UpdateTeamPage";
import InvitationHandler from "../routes/enterprise/InvitationHandler";
import MessagesPage from "../routes/enterprise/MessagesPage";
import MembersPage from "../routes/enterprise/MembersPage";
import FreelancersPage from "../routes/enterprise/FreelancersPage";
import PaymentsPage from "../routes/enterprise/PaymentsPage";
import NotesPage from "../routes/NotesPage";
import CompanyProjects from "../routes/enterprise/CompanyProjects";
import HelpCenterDetails from "../routes/helpCenter/HelpCenterDetails";

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

      // Business Solutions
      {
        path: "bussiness-solutions",
        children: [{ path: ":slug", element: <BusinessSolutions /> }],
      },

      // Business Solutions
      // {
      //   path: "help-center",
      //   children: [{ index: true, element: <HelpCenter /> }],
      // },

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
      {
        path: "tickets",
        element: (
          <PrivateRoute>
            <Tickets />
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
          {
            path: "create",
            element: (
              <PrivateRoute>
                <CreateEnterprise />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "orgs",
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                {" "}
                <Orgs />{" "}
              </PrivateRoute>
            ),
          },
          {
            path: ":link",
            element: <EnterpriseLayout />,
            children: [
              { index: true, element: <EnterpriseDetails /> },
              {
                path: "teams",
                element: <Teams />,
                children: [
                  { index: true, element: <TeamCard /> },
                  { path: ":id/members", element: <TeamMembers /> },
                  { path: "create", element: <AddTeamPage /> },
                  { path: ":id/edit", element: <UpdateTeamPage /> },
                ],
              },
              { path: "edit", element: <EditEnterprise /> },
              { path: "funding", element: <FundSource /> },
              {
                path: "invitations/:inviteToken",
                element: <InvitationHandler />, // الكومبوننت اللي بيعمل apply ويرجع redirect
              },
            ],
          },
        ],
      },
      { path: "/messages", element: <MessagesPage /> },
      { path: "/orgs/:link/messages", element: <MessagesPage /> },
      { path: "/orgs/:link/members", element: <MembersPage /> },
      { path: "/orgs/:link/freelancers", element: <FreelancersPage /> },
      { path: "/orgs/:link/payments", element: <PaymentsPage /> },
      { path: "/orgs/:link/projects", element: <CompanyProjects /> },
      {
        path: "project",
        element: <Outlet />,
        children: [{ path: "create", element: <CreateEnterpriseProject /> }],
      },
    ],
  },
  {
    path: "help-center",
    element: <HelpCenterLayout />,
    children: [
      { index: true, element: <KnowledgeBase /> },
      { path: "faqs", element: <FAQs /> },
      { path: "faqs/:slug", element: <FaqDetails /> },
      { path: ":slug", element: <HelpCategoryDetails /> },
      { path: "details/:slug", element: <HelpCenterDetails /> },
      { path: "sellers", element: <ExtraCategories /> },
      { path: "sellers/:slug", element: <Seller /> },
    ],
  },
]);

export default router;
