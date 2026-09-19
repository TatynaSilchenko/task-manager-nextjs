"use client";

import { useRouter } from "next/navigation";

import { createTask } from "@/api-client/tasks";

import { CreateTask } from "./CreateTask";

type CreateTaskContainerProps = {
  listId: string;
};

export function CreateTaskContainer({ listId }: CreateTaskContainerProps) {
  const router = useRouter();

  return (
    <CreateTask
      onCreate={(values) => createTask(listId, values)}
      onCreated={() => router.refresh()}
    />
  );
}
