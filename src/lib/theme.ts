// Theme utilities — SSR-safe (no window access at module level)

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "portify-theme";
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}
