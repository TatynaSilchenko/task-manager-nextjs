import "server-only";

import type { TaskStatus } from "@/domain/types/task";

import { store } from "../data/store";

export const taskRepository = {
  findByList(listId: string, status?: TaskStatus) {
    return store.tasks.filter(
      (task) => task.listId === listId && (!status || task.status === status),
    );
  },

  updateStatus(id: string, status: TaskStatus) {
    const task = store.tasks.find((item) => item.id === id);

    if (task) {
      task.status = status;
    }

    return task;
  },
};
