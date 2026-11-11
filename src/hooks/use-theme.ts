import { useCallback, useEffect } from "react";

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
const apply = (theme: Theme) => document.documentElement.classList.toggle("dark", theme === "dark");

/**
 * The theme lives in the `dark` class on <html>, set by index.html before the first paint. It
 * isn't React state, so the prerendered page and the browser always agree; whatever shows the
 * theme (like the toggle's label) does it with `dark:` CSS.
 */
export function useTheme() {
  // Keep following the system while nothing is stored
  useEffect(() => {
    const query = systemQuery();
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStored()) apply(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    apply(next);
    try {
      // Picking the system's own theme goes back to following it
      if ((systemQuery().matches ? "dark" : "light") === next) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only
    }
  }, []);

  return { toggle };
}
