import type { TaskInput, TaskUpdate } from "@/domain/task/schema";
import type { Task } from "@/domain/types/task";

import { request } from "./http";

export function createTask(listId: string, values: TaskInput) {
  return request<Task>(`/api/lists/${encodeURIComponent(listId)}/tasks`, {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function updateTask(id: string, values: TaskUpdate) {
  return request<Task>(`/api/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export function deleteTask(id: string) {
  return request<{ id: string }>(`/api/tasks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
