import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoutesView from "./routes";
import Layout from "./shell/Layout";
import { applyInitialTheme, useTheme } from "./shell/theme";
import Seo from "../components/Seo";

export default function App() {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    applyInitialTheme();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <>
      <Seo theme={theme} />
      <Layout>
        <RoutesView />
      </Layout>
    </>
  );
}
