import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TaskDetailsContainer } from "@/features/tasks/task-details/TaskDetailsContainer";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";

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
    <main className={styles.page}>
      <div className={styles.content}>
        {list && (
          <Link href={`/lists/${list.id}`} className={styles.back}>
            {list.title}
          </Link>
        )}

        <h1 className={styles.title}>{task.title}</h1>

        <section className={styles.panel} aria-label="Карточка задачи">
          <TaskDetailsContainer task={task} />
        </section>
      </div>
    </main>
  );
}
