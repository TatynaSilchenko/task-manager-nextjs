import { LOGIN_URL, UNAUTHORIZED_EVENT } from "@/shared/lib/auth";
import type { ApiResult } from "@/shared/types/api";

export async function request<T>(
  url: string,
  init: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { "Content-Type": "application/json", ...init.headers },
    });
    const result: ApiResult<T> = await response.json();

    const isSessionCheck = url !== LOGIN_URL;

    if (
      isSessionCheck &&
      response.status === 401 &&
      typeof window !== "undefined"
    ) {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    return result;
  } catch {
    return { ok: false, error: "Не удалось связаться с сервером" };
  }
}
