import type {
  DeadlineState,
  TaskPriority,
  TaskStatus,
} from "@/domain/types/task";

export const STATUS_LABEL: Record<TaskStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Готово",
};

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};

export const DEADLINE_LABEL: Record<DeadlineState, string | null> = {
  overdue: "Просрочено",
  "due-soon": "Меньше 48 часов",
  none: null,
};
