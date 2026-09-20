import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/shared/lib/auth-cookie";

export async function isAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.has(AUTH_COOKIE);
}
