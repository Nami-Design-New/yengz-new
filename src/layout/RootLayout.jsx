import { Outlet } from "react-router";
import Header from "../ui/layout/Header";
import Footer from "../ui/layout/Footer";
import useAuth from "../hooks/auth/useAuth";

export default function RootLayout() {
  const { isAuthed } = useAuth();

  return (
    <>
      {isAuthed ? (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      ) : null}
    </>
  );
}
