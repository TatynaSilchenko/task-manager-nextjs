import { z } from "zod";

import { TASK_PRIORITIES, TASK_STATUSES } from "../types/task";

export const taskStatusSchema = z.enum(TASK_STATUSES);

export const taskPrioritySchema = z.enum(TASK_PRIORITIES);
