"use client";

import { useRouter } from "next/navigation";

import { updateTaskStatus } from "@/api-client/tasks";
import type { TaskStatus } from "@/domain/types/task";

import { StatusSelect } from "./StatusSelect";

type StatusSelectContainerProps = {
  taskId: string;
  taskTitle: string;
  status: TaskStatus;
};

export function StatusSelectContainer({
  taskId,
  taskTitle,
  status,
}: StatusSelectContainerProps) {
  const router = useRouter();

  return (
    <StatusSelect
      status={status}
      taskTitle={taskTitle}
      onChange={(next) => updateTaskStatus(taskId, { status: next })}
      onChanged={() => router.refresh()}
    />
  );
}
