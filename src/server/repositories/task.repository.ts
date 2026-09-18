import "server-only";

import { store } from "../data/store";

export const taskRepository = {
  findByList(listId: string) {
    return store.tasks.filter((task) => task.listId === listId);
  },
};
