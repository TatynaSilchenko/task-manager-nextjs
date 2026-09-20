"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";

import { createTask } from "@/api-client/tasks";

import { CreateTask } from "./CreateTask";

type CreateTaskContainerProps = {
  listId: string;
};

export function CreateTaskContainer({ listId }: CreateTaskContainerProps) {
  const router = useRouter();
  const { message } = App.useApp();

  return (
    <CreateTask
      onCreate={(values) => createTask(listId, values)}
      onCreated={() => {
        message.success("Задача создана");
        router.refresh();
      }}
    />
  );
}
