import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Введите email" })
    .trim()
    .toLowerCase()
    .min(1, { error: "Введите email" })
    .pipe(z.email({ error: "Введите корректный email" })),
  // Пароль не обрезаем: пробелы могут быть его частью. Но одни пробелы — не пароль.
  password: z
    .string({ error: "Введите пароль" })
    .refine((value) => value.trim() !== "", { error: "Введите пароль" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
