import type { LoginInput } from "@/domain/auth/login-schema";

import { request } from "./http";

export function login(values: LoginInput) {
  return request<{ email: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
