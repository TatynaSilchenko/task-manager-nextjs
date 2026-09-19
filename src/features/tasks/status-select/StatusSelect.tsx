"use client";

import { App, Select } from "antd";
import { useState } from "react";

import { TASK_STATUSES, type TaskStatus } from "@/domain/types/task";
import type { ApiResult } from "@/shared/types/api";

import { STATUS_LABEL } from "../task-labels";
import styles from "./StatusSelect.module.css";

const OPTIONS = TASK_STATUSES.map((status) => ({
  value: status,
  label: STATUS_LABEL[status],
}));

type StatusSelectProps = {
  status: TaskStatus;
  taskTitle: string;
  onChange: (status: TaskStatus) => Promise<ApiResult<unknown>>;
  onChanged?: () => void;
};

export function StatusSelect({
  status,
  taskTitle,
  onChange,
  onChanged,
}: StatusSelectProps) {
  const { message } = App.useApp();
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (next: TaskStatus) => {
    const previous = value;
    setValue(next);
    setLoading(true);

    const result = await onChange(next);
    setLoading(false);

    if (!result.ok) {
      setValue(previous);
      message.error(result.error);
      return;
    }

    onChanged?.();
  };

  return (
    <Select<TaskStatus>
      className={styles.select}
      value={value}
      options={OPTIONS}
      onChange={handleChange}
      loading={loading}
      aria-label={`Статус задачи «${taskTitle}»`}
    />
  );
}
