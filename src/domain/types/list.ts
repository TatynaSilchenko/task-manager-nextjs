import type { DeadlineState } from "./task";

export type TaskList = {
  id: string;
  title: string;
};

export type ListStats = {
  total: number;
  new: number;
  inProgress: number;
  done: number;
  overdue: number;
  progress: number;
  indicator: DeadlineState;
};
