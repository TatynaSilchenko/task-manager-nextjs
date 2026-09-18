export type TaskStatus = "new" | "in_progress" | "done";

export type Task = {
  id: string;
  listId: string;
  title: string;
  status: TaskStatus;
  deadline: string;
};
