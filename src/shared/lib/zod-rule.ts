import type { FormRule } from "antd";
import type { ZodType } from "zod";

export function zodRule(schema: ZodType): FormRule {
  return {
    validator: async (_rule, value) => {
      const result = schema.safeParse(value);

      if (!result.success) {
        throw new Error(result.error.issues[0]?.message);
      }
    },
  };
}
