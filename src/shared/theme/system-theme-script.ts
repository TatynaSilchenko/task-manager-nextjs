import { SYSTEM_THEME_COOKIE } from "./theme-preference";

export const systemThemeScript = `(function () {
  var root = document.documentElement;
  if (root.dataset.themePreference !== "system") return;
  var actual = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  if (root.dataset.systemTheme === actual) return;
  document.cookie = "${SYSTEM_THEME_COOKIE}=" + actual + "; path=/; max-age=31536000; samesite=lax";
  if (document.cookie.indexOf("${SYSTEM_THEME_COOKIE}=" + actual) === -1) return;
  root.style.colorScheme = actual;
  root.style.visibility = "hidden";
  location.reload();
})();`;
