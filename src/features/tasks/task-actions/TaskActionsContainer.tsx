"use client";

import { useRouter } from "next/navigation";

import { deleteTask, updateTask } from "@/api-client/tasks";
import type { Task } from "@/domain/types/task";

import { TaskActions } from "./TaskActions";

type TaskActionsContainerProps = {
  task: Task;
};

export function TaskActionsContainer({ task }: TaskActionsContainerProps) {
  const router = useRouter();
  const { id, title, description, status, priority, deadline } = task;

  return (
    <TaskActions
      task={{ title, description, status, priority, deadline }}
      onUpdate={(values) => updateTask(id, values)}
      onDelete={() => deleteTask(id)}
      onChanged={() => router.refresh()}
    />
  );
}
