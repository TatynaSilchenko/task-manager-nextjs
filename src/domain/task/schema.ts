import { z } from "zod";

import { TASK_PRIORITIES, TASK_STATUSES } from "../types/task";

export const taskStatusSchema = z.enum(TASK_STATUSES, {
  error: "Неизвестный статус",
});

export const taskPrioritySchema = z.enum(TASK_PRIORITIES, {
  error: "Неизвестный приоритет",
});

export const taskStatusUpdateSchema = z.object({
  status: taskStatusSchema,
});

export type TaskStatusUpdate = z.infer<typeof taskStatusUpdateSchema>;
