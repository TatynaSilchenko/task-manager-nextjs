import { listInputSchema } from "@/domain/list/list-schema";
import { isAuthenticated } from "@/server/auth-cookie";
import {
  apiOk,
  apiUnauthorized,
  apiValidationError,
} from "@/server/http/api-response";
import { listRepository } from "@/server/repositories/list.repository";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return apiUnauthorized();
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = listInputSchema.safeParse(body);

  if (!parsed.success) {
    return apiValidationError(parsed.error);
  }

  return apiOk(listRepository.create(parsed.data.title), 201);
}
