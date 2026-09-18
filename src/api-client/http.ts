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

    return result;
  } catch {
    return { ok: false, error: "Не удалось связаться с сервером" };
  }
}
