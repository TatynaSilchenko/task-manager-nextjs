"use client";

import { Table, type TableColumnsType } from "antd";

import type { DeadlineState, Task } from "@/domain/types/task";
import { formatDeadline } from "@/shared/lib/date";

import { DEADLINE_LABEL, PRIORITY_LABEL, STATUS_LABEL } from "../task-labels";
import styles from "./TaskTable.module.css";

export type TaskRow = Task & { deadlineState: DeadlineState };

const DONE_ROW_CLASS = styles.done ?? "";

const columns: TableColumnsType<TaskRow> = [
  {
    title: "Задача",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    width: 140,
    render: (_, task) => STATUS_LABEL[task.status],
  },
  {
    title: "Приоритет",
    dataIndex: "priority",
    key: "priority",
    width: 140,
    render: (_, task) => (
      <span className={styles.priority} data-priority={task.priority}>
        {PRIORITY_LABEL[task.priority]}
      </span>
    ),
  },
  {
    title: "Дедлайн",
    dataIndex: "deadline",
    key: "deadline",
    width: 200,
    render: (_, task) => {
      const label = DEADLINE_LABEL[task.deadlineState];

      return (
        <div className={styles.deadline} data-state={task.deadlineState}>
          <span className={styles.date}>{formatDeadline(task.deadline)}</span>
          {label && <span className={styles.deadlineLabel}>{label}</span>}
        </div>
      );
    },
  },
];

type TaskTableProps = {
  tasks: TaskRow[];
  emptyText: string;
};

export function TaskTable({ tasks, emptyText }: TaskTableProps) {
  return (
    <Table<TaskRow>
      rowKey="id"
      columns={columns}
      dataSource={tasks}
      pagination={false}
      locale={{ emptyText }}
      rowClassName={(task) => (task.status === "done" ? DONE_ROW_CLASS : "")}
      scroll={{ x: 640 }}
    />
  );
}
