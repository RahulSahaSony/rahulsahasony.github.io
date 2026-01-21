import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "dark" | "light";
const KEY = "theme";

export function applyInitialTheme() {
  const stored = (localStorage.getItem(KEY) as ThemeMode | null) ?? "dark";
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(stored);
  root.dataset.theme = stored;
}

export function setTheme(mode: ThemeMode) {
  localStorage.setItem(KEY, mode);
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(mode);
  root.dataset.theme = mode;
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem(KEY) as ThemeMode | null) ?? "dark";
  });

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return useMemo(
    () => ({
      theme,
      toggle: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
      set: (t: ThemeMode) => setThemeState(t)
    }),
    [theme]
  );
}

