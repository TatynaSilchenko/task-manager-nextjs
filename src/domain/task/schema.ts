import { z } from "zod";

import { TASK_PRIORITIES, TASK_STATUSES } from "../types/task";

export const TASK_TITLE_MAX_LENGTH = 200;

export const TASK_DESCRIPTION_MAX_LENGTH = 2000;

export const taskStatusSchema = z.enum(TASK_STATUSES, {
  error: "Неизвестный статус",
});

const taskPrioritySchema = z.enum(TASK_PRIORITIES, {
  error: "Неизвестный приоритет",
});

export const taskInputSchema = z.object({
  title: z
    .string({ error: "Введите название" })
    .trim()
    .min(1, { error: "Введите название" })
    .max(TASK_TITLE_MAX_LENGTH, {
      error: `Не длиннее ${TASK_TITLE_MAX_LENGTH} символов`,
    }),
  description: z
    .string({ error: "Описание должно быть текстом" })
    .trim()
    .max(TASK_DESCRIPTION_MAX_LENGTH, {
      error: `Не длиннее ${TASK_DESCRIPTION_MAX_LENGTH} символов`,
    }),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  deadline: z.iso.datetime({ error: "Выберите дедлайн" }),
});

export const taskUpdateSchema = taskInputSchema
  .partial()
  .refine((changes) => Object.keys(changes).length > 0);

export type TaskInput = z.infer<typeof taskInputSchema>;

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
