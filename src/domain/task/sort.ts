import type { Task, TaskPriority } from "./types";

type SortableTask = Pick<Task, "status" | "priority" | "deadline">;

const PRIORITY_RANK: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function sortTasks<T extends SortableTask>(tasks: T[]): T[] {
  return tasks.toSorted((a, b) => {
    const aDone = a.status === "done";
    const bDone = b.status === "done";

    if (aDone !== bDone) {
      return aDone ? 1 : -1;
    }

    const byDeadline =
      new Date(a.deadline).getTime() - new Date(b.deadline).getTime();

    if (byDeadline !== 0) {
      return byDeadline;
    }

    return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  });
}
