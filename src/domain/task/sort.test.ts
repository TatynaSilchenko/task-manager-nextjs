import { describe, expect, it } from "vitest";

import { sortTasks } from "./sort";
import type { Task } from "../types/task";

const NOW = new Date("2026-09-18T12:00:00.000Z");
const HOUR = 60 * 60 * 1000;

function makeTask(
  id: string,
  overrides: Partial<Pick<Task, "status" | "priority">> & {
    hoursUntilDeadline?: number;
  } = {},
) {
  const {
    status = "new",
    priority = "medium",
    hoursUntilDeadline = 100,
  } = overrides;

  return {
    id,
    status,
    priority,
    deadline: new Date(NOW.getTime() + hoursUntilDeadline * HOUR).toISOString(),
  };
}

const ids = (tasks: { id: string }[]) => tasks.map((task) => task.id);

describe("sortTasks", () => {
  it("puts done tasks at the bottom", () => {
    const tasks = [
      makeTask("done", { status: "done", hoursUntilDeadline: 1 }),
      makeTask("new"),
    ];

    expect(ids(sortTasks(tasks))).toEqual(["new", "done"]);
  });

  it("keeps a past deadline above an upcoming one", () => {
    const tasks = [
      makeTask("soon", { hoursUntilDeadline: 1 }),
      makeTask("overdue", { hoursUntilDeadline: -1 }),
    ];

    expect(ids(sortTasks(tasks))).toEqual(["overdue", "soon"]);
  });

  it("orders tasks by closer deadline", () => {
    const tasks = [
      makeTask("later", { hoursUntilDeadline: 50 }),
      makeTask("sooner", { hoursUntilDeadline: 5 }),
    ];

    expect(ids(sortTasks(tasks))).toEqual(["sooner", "later"]);
  });

  it("uses priority when deadlines are equal", () => {
    const tasks = [
      makeTask("low", { priority: "low" }),
      makeTask("high", { priority: "high" }),
    ];

    expect(ids(sortTasks(tasks))).toEqual(["high", "low"]);
  });
});
