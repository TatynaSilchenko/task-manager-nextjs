export const AUTH_COOKIE = "auth";

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
} as const;

export function safeRedirectPath(value?: string | string[]) {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
    ? value
    : "/lists";
}

export const UNAUTHORIZED_EVENT = "app:unauthorized";

export const LOGIN_URL = "/api/auth/login";
