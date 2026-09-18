export type TaskStatus = "new" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  listId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
};
