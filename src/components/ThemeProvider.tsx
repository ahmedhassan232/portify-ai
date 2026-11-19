"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  type Theme,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isTheme,
} from "@/lib/theme";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggle: () => {},
});

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): Theme {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore gives us consistent server/client rendering
  const syncedTheme = useSyncExternalStore(
    subscribeStorage,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [overrideTheme, setOverrideTheme] = useState<Theme | null>(null);
  const theme = overrideTheme ?? syncedTheme;

  // Apply dark/light class to <html> and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, t);
          window.dispatchEvent(new Event("storage"));
        } catch {}
        setOverrideTheme(t);
      },
      toggle: () => {
        const next = theme === "dark" ? "light" : "dark";
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
          window.dispatchEvent(new Event("storage"));
        } catch {}
        setOverrideTheme(next);
      },
    }),
    [theme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
