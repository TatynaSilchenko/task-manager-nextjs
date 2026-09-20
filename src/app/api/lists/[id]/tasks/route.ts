import { taskInputSchema } from "@/domain/task/schema";
import { isAuthenticated } from "@/server/auth";
import {
  apiNotFound,
  apiOk,
  apiUnauthorized,
  apiValidationError,
} from "@/server/http/api-response";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";

export async function POST(
  request: Request,
  ctx: RouteContext<"/api/lists/[id]/tasks">,
) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const { id } = await ctx.params;

  if (!listRepository.findById(id)) {
    return apiNotFound("Список не найден");
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = taskInputSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  return apiOk(taskRepository.create(id, parsed.data), 201);
}
