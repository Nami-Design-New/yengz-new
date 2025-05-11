import { useEffect } from "react";
import { Toaster } from "sonner";
import router from "./providers/router";
import { RouterProvider } from "react-router";
import { useSelector } from "react-redux";
import i18n from "./utils/i18n";

function App() {
  const { lang } = useSelector((state) => state.language);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <Toaster expand={false} richColors position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
