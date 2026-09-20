export const THEME_COOKIE = "theme";

export const SYSTEM_THEME_COOKIE = "system-theme";

export const THEME_PREFERENCES = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export type ResolvedTheme = "light" | "dark";

export function parseThemePreference(value?: string): ThemePreference {
  return (
    THEME_PREFERENCES.find((preference) => preference === value) ?? "system"
  );
}

export function resolveTheme(
  preference: ThemePreference,
  systemTheme: ResolvedTheme,
): ResolvedTheme {
  return preference === "system" ? systemTheme : preference;
}

export function parseResolvedTheme(
  value?: string | null,
): ResolvedTheme | null {
  return value === "light" || value === "dark" ? value : null;
}
