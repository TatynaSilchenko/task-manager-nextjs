import "server-only";

import { store } from "../data/store";

export const listRepository = {
  findAll() {
    return [...store.lists];
  },
};
