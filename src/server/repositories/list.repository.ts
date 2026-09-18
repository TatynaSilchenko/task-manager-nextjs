import "server-only";

import type { TaskList } from "@/domain/list/types";

import { store } from "../data/store";

export const listRepository = {
  findAll(query = "") {
    const normalizedQuery = query.trim().toLowerCase();

    return store.lists.filter((list) =>
      list.title.toLowerCase().includes(normalizedQuery),
    );
  },

  create(title: string) {
    const list: TaskList = { id: crypto.randomUUID(), title };
    store.lists.push(list);

    return list;
  },

  rename(id: string, title: string) {
    const list = store.lists.find((item) => item.id === id);

    if (list) {
      list.title = title;
    }

    return list;
  },

  remove(id: string) {
    const lengthBefore = store.lists.length;
    store.lists = store.lists.filter((list) => list.id !== id);
    store.tasks = store.tasks.filter((task) => task.listId !== id);

    return store.lists.length < lengthBefore;
  },
};
