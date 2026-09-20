import "server-only";

import { cookies, headers } from "next/headers";

import {
  parseResolvedTheme,
  parseThemePreference,
  SYSTEM_THEME_COOKIE,
  THEME_COOKIE,
} from "@/shared/theme/theme-preference";

const SYSTEM_THEME_HINT = "Sec-CH-Prefers-Color-Scheme";

export async function getInitialTheme() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);

  const preference = parseThemePreference(cookieStore.get(THEME_COOKIE)?.value);
  const systemTheme =
    parseResolvedTheme(headerList.get(SYSTEM_THEME_HINT)) ??
    parseResolvedTheme(cookieStore.get(SYSTEM_THEME_COOKIE)?.value) ??
    "light";

  return { preference, systemTheme };
}
