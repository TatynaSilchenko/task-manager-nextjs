import type { TaskStatusUpdate } from "@/domain/task/schema";
import type { Task } from "@/domain/types/task";

import { request } from "./http";

export function updateTaskStatus(id: string, values: TaskStatusUpdate) {
  return request<Task>(`/api/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}
