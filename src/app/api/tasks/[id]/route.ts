import { taskStatusUpdateSchema } from "@/domain/task/schema";
import { isAuthenticated } from "@/server/auth-cookie";
import {
  apiNotFound,
  apiOk,
  apiUnauthorized,
  apiValidationError,
} from "@/server/http/api-response";
import { taskRepository } from "@/server/repositories/task.repository";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/tasks/[id]">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = taskStatusUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  const task = taskRepository.updateStatus(id, parsed.data.status);

  return task ? apiOk(task) : apiNotFound("Задача не найдена");
}
