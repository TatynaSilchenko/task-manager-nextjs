import { cookies } from "next/headers";

import { loginSchema } from "@/domain/auth/login-schema";
import { AUTH_COOKIE, authCookieOptions } from "@/server/auth-cookie";
import {
  apiError,
  apiOk,
  apiValidationError,
} from "@/server/http/api-response";

// Локальные учётные данные из условия задания.
const DEMO_USER = { email: "admin@example.com", password: "Admin123!" };

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  const { email, password } = parsed.data;

  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return apiError("Неверный email или пароль", 401);
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "1", authCookieOptions);

  return apiOk({ email });
}
