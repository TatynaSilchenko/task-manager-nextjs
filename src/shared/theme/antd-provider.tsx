"use client";

import { App, ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import { darkTheme, lightTheme } from "./antd-theme";
import {
  type ResolvedTheme,
  resolveTheme,
  SYSTEM_THEME_COOKIE,
  THEME_COOKIE,
  type ThemePreference,
} from "./theme-preference";

dayjs.locale("ru");

const DARK_QUERY = "(prefers-color-scheme: dark)";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToSystemTheme(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

type AntdProviderProps = {
  initialPreference: ThemePreference;
  initialSystemTheme: ResolvedTheme;
  children: ReactNode;
};

export function AntdProvider({
  initialPreference,
  initialSystemTheme,
  children,
}: AntdProviderProps) {
  const [preference, setPreferenceState] = useState(initialPreference);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => initialSystemTheme,
  );
  const resolvedTheme = resolveTheme(preference, systemTheme);

  useEffect(() => {
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    document.cookie = `${SYSTEM_THEME_COOKIE}=${systemTheme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  }, [systemTheme]);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  };

  return (
    <ThemeContext value={{ preference, setPreference }}>
      <ConfigProvider
        locale={ruRU}
        theme={resolvedTheme === "dark" ? darkTheme : lightTheme}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext>
  );
}

export function useThemePreference() {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useThemePreference must be used inside AntdProvider");
  }

  return context;
}
