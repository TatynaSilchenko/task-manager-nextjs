import { taskUpdateSchema } from "@/domain/task/schema";
import { isAuthenticated } from "@/server/auth-cookie";
import {
  apiNotFound,
  apiOk,
  apiUnauthorized,
  apiValidationError,
} from "@/server/http/api-response";
import { taskRepository } from "@/server/repositories/task.repository";

const NOT_FOUND = "Задача не найдена";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/tasks/[id]">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = taskUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  const task = taskRepository.update(id, parsed.data);

  return task ? apiOk(task) : apiNotFound(NOT_FOUND);
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/tasks/[id]">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;

  return taskRepository.remove(id) ? apiOk({ id }) : apiNotFound(NOT_FOUND);
}
