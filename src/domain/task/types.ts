export type TaskStatus = "new" | "in_progress" | "done";

export type Task = {
  id: string;
  listId: string;
  title: string;
  status: TaskStatus;
  /** Дата в ISO-формате: такая строка без потерь передаётся с сервера на клиент. */
  deadline: string;
};
