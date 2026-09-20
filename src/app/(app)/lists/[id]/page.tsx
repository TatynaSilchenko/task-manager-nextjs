import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDeadlineState } from "@/domain/task/deadline";
import { taskStatusSchema } from "@/domain/task/schema";
import { sortTasks } from "@/domain/task/sort";
import { CreateTaskContainer } from "@/features/tasks/create-task/CreateTaskContainer";
import { StatusFilter } from "@/features/tasks/status-filter/StatusFilter";
import { TaskTable } from "@/features/tasks/task-table/TaskTable";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";
import { BackLink } from "@/shared/ui/back-link/BackLink";
import { PageLayout, PageTitle } from "@/shared/ui/page-layout/PageLayout";

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
    <PageLayout back={<BackLink href="/lists">Все списки</BackLink>}>
      <header className={styles.header}>
        <PageTitle>{list.title}</PageTitle>
        <div className={styles.toolbar}>
          <StatusFilter value={statusFilter} />
          <CreateTaskContainer listId={list.id} />
        </div>
      </header>

      <TaskTable
        tasks={tasks}
        emptyText={
          statusFilter ? "Нет задач с этим статусом" : "В списке пока нет задач"
        }
      />
    </PageLayout>
  );
}
