"use client";

import { useEffect } from "react";

import { ErrorScreen } from "@/features/errors/ErrorScreen";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <ErrorScreen
      title="Что-то пошло не так"
      description="Страница не загрузилась. Попробуйте ещё раз."
      onRetry={reset}
    />
  );
}
