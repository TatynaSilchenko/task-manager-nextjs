import { z } from "zod";

export const LIST_TITLE_MAX_LENGTH = 100;

export const listInputSchema = z.object({
  title: z
    .string({ error: "Введите название" })
    .trim()
    .min(1, { error: "Введите название" })
    .max(LIST_TITLE_MAX_LENGTH, {
      error: `Не длиннее ${LIST_TITLE_MAX_LENGTH} символов`,
    }),
});

export type ListInput = z.infer<typeof listInputSchema>;
