import { listInputSchema } from "@/domain/list/list-schema";
import { isAuthenticated } from "@/server/auth-cookie";
import {
  apiNotFound,
  apiOk,
  apiUnauthorized,
  apiValidationError,
} from "@/server/http/api-response";
import { listRepository } from "@/server/repositories/list.repository";

const NOT_FOUND = "Список не найден";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/lists/[id]">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = listInputSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  const list = listRepository.rename(id, parsed.data.title);

  return list ? apiOk(list) : apiNotFound(NOT_FOUND);
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/lists/[id]">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;

  return listRepository.remove(id) ? apiOk({ id }) : apiNotFound(NOT_FOUND);
}
