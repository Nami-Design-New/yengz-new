import { Outlet } from "react-router";
import Header from "../ui/layout/Header";
import Footer from "../ui/layout/Footer";
import useAuth from "../hooks/auth/useAuth";
import MobileNav from "../ui/layout/MobileNav";
import Loader from "../ui/Loader";

export default function RootLayout() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <MobileNav />
        </>
      )}
    </>
  );
}
