import type { ListInput } from "@/domain/list/list-schema";
import type { TaskList } from "@/domain/types/list";

import { request } from "./http";

export function createList(values: ListInput) {
  return request<TaskList>("/api/lists", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function renameList(id: string, values: ListInput) {
  return request<TaskList>(`/api/lists/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export function deleteList(id: string) {
  return request<{ id: string }>(`/api/lists/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
