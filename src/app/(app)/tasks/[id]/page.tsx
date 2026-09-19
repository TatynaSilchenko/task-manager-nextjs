import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TaskDetailsContainer } from "@/features/tasks/task-details/TaskDetailsContainer";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";
import { BackLink } from "@/shared/ui/back-link/BackLink";
import { PageLayout, PageTitle } from "@/shared/ui/page-layout/PageLayout";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Задача — Task Manager",
};

export default async function TaskPage({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params;
  const task = taskRepository.findById(id);

  if (!task) {
    notFound();
  }

  const list = listRepository.findById(task.listId);

  return (
    <PageLayout width="narrow">
      {list && (
        <BackLink href={`/lists/${list.id}`}>К списку «{list.title}»</BackLink>
      )}

      <PageTitle>{task.title}</PageTitle>

      <section className={styles.panel} aria-label="Карточка задачи">
        <TaskDetailsContainer key={JSON.stringify(task)} task={task} />
      </section>
    </PageLayout>
  );
}
