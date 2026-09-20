import type { Metadata } from "next";

import { ErrorScreen } from "@/features/errors/ErrorScreen";

export const metadata: Metadata = {
  title: "Страница не найдена — Task Manager",
};

export default function NotFound() {
  return (
    <ErrorScreen
      title="Страница не найдена"
      description="Возможно, список или задача были удалены."
    />
  );
}
