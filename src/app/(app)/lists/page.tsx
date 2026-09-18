import type { Metadata } from "next";
import { connection } from "next/server";

import { getListStats } from "@/domain/list/stats";
import { ListCard } from "@/features/lists/list-card/ListCard";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Списки задач — Task Manager",
};

export default async function ListsPage() {
  // Данные в памяти читаются синхронно: без этого страница отрендерится один раз при сборке.
  await connection();

  const now = new Date();
  const lists = listRepository.findAll().map((list) => ({
    list,
    stats: getListStats(taskRepository.findByList(list.id), now),
  }));

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Списки задач</h1>

      <div className={styles.grid}>
        {lists.map(({ list, stats }) => (
          <ListCard
            key={list.id}
            id={list.id}
            title={list.title}
            stats={stats}
          />
        ))}
      </div>
    </main>
  );
}
