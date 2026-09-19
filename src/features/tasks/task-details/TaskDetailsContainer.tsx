"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";

import { updateTask } from "@/api-client/tasks";
import type { Task } from "@/domain/types/task";

import { TaskForm } from "../task-form/TaskForm";

type TaskDetailsContainerProps = {
  task: Task;
};

export function TaskDetailsContainer({ task }: TaskDetailsContainerProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const { id, title, description, status, priority, deadline } = task;

  return (
    <TaskForm
      initialValues={{ title, description, status, priority, deadline }}
      submitText="Сохранить"
      onSubmit={(values) => updateTask(id, values)}
      onSuccess={() => {
        message.success("Изменения сохранены");
        router.refresh();
      }}
    />
  );
}
