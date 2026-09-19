import { describe, expect, it } from "vitest";

import type { Task } from "../types/task";
import { getListStats } from "./stats";

const NOW = new Date("2026-09-18T12:00:00.000Z");
const HOUR = 60 * 60 * 1000;

function makeTask(
  status: Task["status"],
  hoursUntilDeadline: number,
): Pick<Task, "status" | "deadline"> {
  return {
    status,
    deadline: new Date(NOW.getTime() + hoursUntilDeadline * HOUR).toISOString(),
  };
}

describe("getListStats", () => {
  it("counts tasks by status", () => {
    const stats = getListStats(
      [
        makeTask("new", 100),
        makeTask("in_progress", 100),
        makeTask("done", 100),
      ],
      NOW,
    );

    expect(stats).toMatchObject({ new: 1, inProgress: 1, done: 1 });
  });

  it("counts only unfinished tasks with a past deadline as overdue", () => {
    const stats = getListStats(
      [makeTask("new", -1), makeTask("done", -1)],
      NOW,
    );

    expect(stats.overdue).toBe(1);
  });

  it("calculates progress as a percentage of done tasks", () => {
    const stats = getListStats(
      [makeTask("done", 100), makeTask("new", 100)],
      NOW,
    );

    expect(stats.progress).toBe(50);
  });

  it("shows the overdue indicator when a task is overdue", () => {
    const stats = getListStats([makeTask("new", -1)], NOW);

    expect(stats.indicator).toBe("overdue");
  });

  it("shows the due soon indicator when a deadline is within 48 hours", () => {
    const stats = getListStats([makeTask("new", 10)], NOW);

    expect(stats.indicator).toBe("due-soon");
  });
});
