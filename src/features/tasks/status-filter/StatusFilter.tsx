"use client";

import { Segmented } from "antd";
import { usePathname, useRouter } from "next/navigation";

import type { TaskStatus } from "@/domain/types/task";

import { STATUS_LABEL } from "../task-labels";

type FilterValue = TaskStatus | "all";

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "new", label: "Новые" },
  { value: "in_progress", label: STATUS_LABEL.in_progress },
  { value: "done", label: STATUS_LABEL.done },
];

type StatusFilterProps = {
  value?: TaskStatus;
};

export function StatusFilter({ value }: StatusFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (next: FilterValue) => {
    router.replace(next === "all" ? pathname : `${pathname}?status=${next}`);
  };

  return (
    <Segmented<FilterValue>
      options={OPTIONS}
      value={value ?? "all"}
      onChange={handleChange}
      aria-label="Фильтр по статусу"
    />
  );
}
