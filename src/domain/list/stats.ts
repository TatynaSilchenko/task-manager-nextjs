import { isDueSoon, isOverdue } from "../task/deadline";
import type { Task } from "../task/types";

export type ListIndicator = "overdue" | "due-soon" | "none";

export type ListStats = {
  total: number;
  new: number;
  inProgress: number;
  done: number;
  overdue: number;
  progress: number;
  indicator: ListIndicator;
};

type StatsTask = Pick<Task, "status" | "deadline">;

export function getListStats(tasks: StatsTask[], now: Date): ListStats {
  const count = (predicate: (task: StatsTask) => boolean) =>
    tasks.filter(predicate).length;

  const total = tasks.length;
  const done = count((task) => task.status === "done");
  const overdue = count((task) => isOverdue(task, now));
  const dueSoon = count((task) => isDueSoon(task, now));

  return {
    total,
    new: count((task) => task.status === "new"),
    inProgress: count((task) => task.status === "in_progress"),
    done,
    overdue,
    progress: total === 0 ? 0 : Math.round((done / total) * 100),
    indicator: overdue > 0 ? "overdue" : dueSoon > 0 ? "due-soon" : "none",
  };
}
