import "server-only";

import { cookies } from "next/headers";

export const AUTH_COOKIE = "auth";

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
} as const;

export async function isAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.has(AUTH_COOKIE);
}
