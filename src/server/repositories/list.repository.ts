import "server-only";

import { store } from "../data/store";

export const listRepository = {
  findAll(query = "") {
    const normalizedQuery = query.trim().toLowerCase();

    return store.lists.filter((list) =>
      list.title.toLowerCase().includes(normalizedQuery),
    );
  },
};
