import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import type { ApiResult } from "@/shared/types/api";

export function apiOk<T>(data: T, status = 200) {
  return NextResponse.json<ApiResult<T>>({ ok: true, data }, { status });
}

export function apiError(
  error: string,
  status: number,
  fieldErrors?: Partial<Record<string, string[]>>,
) {
  return NextResponse.json<ApiResult<never>>(
    { ok: false, error, fieldErrors },
    { status },
  );
}

export function apiValidationError(error: z.ZodError) {
  return apiError(
    "Проверьте введённые данные",
    400,
    z.flattenError(error).fieldErrors,
  );
}

export function apiUnauthorized() {
  return apiError("Нужно войти в систему", 401);
}

export function apiNotFound(error: string) {
  return apiError(error, 404);
}
