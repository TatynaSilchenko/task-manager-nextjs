import { Empty } from "antd";
import type { Metadata } from "next";

import { getListStats } from "@/domain/list/stats";
import { CreateListContainer } from "@/features/lists/create-list/CreateListContainer";
import { ListActionsContainer } from "@/features/lists/list-actions/ListActionsContainer";
import { ListCard } from "@/features/lists/list-card/ListCard";
import { ListSearch } from "@/features/lists/list-search/ListSearch";
import { listRepository } from "@/server/repositories/list.repository";
import { taskRepository } from "@/server/repositories/task.repository";
import { PageLayout, PageTitle } from "@/shared/ui/page-layout/PageLayout";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Списки задач — Task Manager",
};

export default async function ListsPage({ searchParams }: PageProps<"/lists">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  const now = new Date();
  const lists = listRepository.findAll(query).map((list) => ({
    list,
    stats: getListStats(taskRepository.findByList(list.id), now),
  }));

  return (
    <PageLayout>
      <header className={styles.header}>
        <PageTitle>Списки задач</PageTitle>
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <ListSearch defaultValue={query} />
          </div>
          <CreateListContainer />
        </div>
      </header>

      {lists.length > 0 ? (
        <div className={styles.grid}>
          {lists.map(({ list, stats }) => (
            <ListCard
              key={list.id}
              id={list.id}
              title={list.title}
              stats={stats}
              actions={<ListActionsContainer id={list.id} title={list.title} />}
            />
          ))}
        </div>
      ) : (
        <Empty description={query ? "Ничего не найдено" : "Списков пока нет"} />
      )}
    </PageLayout>
  );
}
