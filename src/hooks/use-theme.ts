import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

const systemQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/**
 * Follows the system theme until the visitor picks one. index.html applies the same
 * logic before the first paint, so there's no flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Keep following the system while nothing is stored
  useEffect(() => {
    const query = systemQuery();
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStored()) setThemeState(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      // Picking the system's own theme goes back to following it
      if ((systemQuery().matches ? "dark" : "light") === next) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only
    }
  }, []);

  return { theme, setTheme };
}
