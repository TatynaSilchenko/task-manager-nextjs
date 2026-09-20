import type { LoginInput } from "@/domain/auth/login-schema";

import { LOGIN_URL } from "@/shared/lib/auth";

import { request } from "./http";

export function login(values: LoginInput) {
  return request<{ email: string }>(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(values),
  });
}
