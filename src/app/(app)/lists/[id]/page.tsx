import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDeadlineState } from "@/domain/task/deadline";
import { taskStatusSchema } from "@/domain/task/schema";
import { sortTasks } from "@/domain/task/sort";
import { StatusFilter } from "@/features/tasks/status-filter/StatusFilter";
import { TaskTable } from "@/features/tasks/task-table/TaskTable";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Задачи — Task Manager",
};

export default async function ListTasksPage({
  params,
  searchParams,
}: PageProps<"/lists/[id]">) {
  const { id } = await params;
  const { status } = await searchParams;

  const list = listRepository.findById(id);

  if (!list) {
    notFound();
  }

  const parsedStatus = taskStatusSchema.safeParse(status);
  const statusFilter = parsedStatus.success ? parsedStatus.data : undefined;

  const now = new Date();
  const tasks = sortTasks(taskRepository.findByList(id, statusFilter)).map(
    (task) => ({ ...task, deadlineState: getDeadlineState(task, now) }),
  );

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link href="/lists" className={styles.back}>
          Все списки
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{list.title}</h1>
          <StatusFilter value={statusFilter} />
        </header>

        <TaskTable
          tasks={tasks}
          emptyText={
            statusFilter
              ? "Нет задач с этим статусом"
              : "В списке пока нет задач"
          }
        />
      </div>
    </main>
  );
}
