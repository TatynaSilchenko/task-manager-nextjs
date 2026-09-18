import { Progress } from "antd";
import Link from "next/link";
import type { ReactNode } from "react";

import type { ListIndicator, ListStats } from "@/domain/list/stats";

import styles from "./ListCard.module.css";

const INDICATOR_LABEL: Record<ListIndicator, string | null> = {
  overdue: "Есть просроченные задачи",
  "due-soon": "Дедлайн в ближайшие 48 часов",
  none: null,
};

type ListCardProps = {
  id: string;
  title: string;
  stats: ListStats;
  actions?: ReactNode;
};

export function ListCard({ id, title, stats, actions }: ListCardProps) {
  const indicatorLabel = INDICATOR_LABEL[stats.indicator];

  return (
    <article className={styles.card} data-indicator={stats.indicator}>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          <Link href={`/lists/${id}`} className={styles.link}>
            {title}
          </Link>
        </h2>
        {indicatorLabel && <p className={styles.indicator}>{indicatorLabel}</p>}
      </div>

      <dl className={styles.counters}>
        <div>
          <dt>Новые</dt>
          <dd>{stats.new}</dd>
        </div>
        <div>
          <dt>В работе</dt>
          <dd>{stats.inProgress}</dd>
        </div>
        <div>
          <dt>Готово</dt>
          <dd>{stats.done}</dd>
        </div>
        <div className={stats.overdue > 0 ? styles.overdue : undefined}>
          <dt>Просрочено</dt>
          <dd>{stats.overdue}</dd>
        </div>
      </dl>

      <Progress
        percent={stats.progress}
        size="small"
        aria-label={`Выполнено ${stats.done} из ${stats.total}`}
      />

      {actions && <div className={styles.actions}>{actions}</div>}
    </article>
  );
}
