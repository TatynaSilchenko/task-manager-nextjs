export const TASK_STATUSES = ["new", "in_progress", "done"] as const;

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  listId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
};

export type DeadlineState = "overdue" | "due-soon" | "none";
