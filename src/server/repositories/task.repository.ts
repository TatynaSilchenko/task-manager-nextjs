import "server-only";

import type { TaskInput, TaskUpdate } from "@/domain/task/schema";
import type { Task, TaskStatus } from "@/domain/types/task";

import { store } from "../data/store";

export const taskRepository = {
  findByList(listId: string, status?: TaskStatus) {
    return store.tasks.filter(
      (task) => task.listId === listId && (!status || task.status === status),
    );
  },

  create(listId: string, input: TaskInput) {
    const task: Task = { id: crypto.randomUUID(), listId, ...input };
    store.tasks.push(task);

    return task;
  },

  update(id: string, changes: TaskUpdate) {
    const task = store.tasks.find((item) => item.id === id);

    if (task) {
      Object.assign(task, changes);
    }

    return task;
  },

  remove(id: string) {
    const lengthBefore = store.tasks.length;
    store.tasks = store.tasks.filter((task) => task.id !== id);

    return store.tasks.length < lengthBefore;
  },
};
