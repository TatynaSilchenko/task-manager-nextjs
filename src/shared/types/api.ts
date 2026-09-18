/** Единый формат ответа API routes: его возвращает сервер и разбирает api-client. */
export type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    };
