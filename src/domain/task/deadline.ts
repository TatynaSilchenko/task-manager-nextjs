import type { Task } from "./types";

const DUE_SOON_MS = 48 * 60 * 60 * 1000;

type DeadlineTask = Pick<Task, "status" | "deadline">;

export function isOverdue(task: DeadlineTask, now: Date) {
  return (
    task.status !== "done" && new Date(task.deadline).getTime() < now.getTime()
  );
}

export function isDueSoon(task: DeadlineTask, now: Date) {
  if (task.status === "done") return false;

  const msLeft = new Date(task.deadline).getTime() - now.getTime();

  return msLeft >= 0 && msLeft <= DUE_SOON_MS;
}
