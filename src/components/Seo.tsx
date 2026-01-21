import { useEffect } from "react";
import { profile } from "../data/profile";
import type { ThemeMode } from "../app/shell/theme";

export default function Seo({ theme }: { theme: ThemeMode }) {
  useEffect(() => {
    document.title = `${profile.name} — Portfolio`;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      const m = document.createElement("meta");
      m.name = "theme-color";
      m.content = theme === "dark" ? "#0b0f14" : "#0f141b";
      document.head.appendChild(m);
    } else {
      (metaTheme as HTMLMetaElement).content = theme === "dark" ? "#0b0f14" : "#0f141b";
    }
  }, [theme]);

  return null;
}
