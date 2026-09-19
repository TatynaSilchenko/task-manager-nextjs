"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

import type { TaskInput } from "@/domain/task/schema";
import type { ApiResult } from "@/shared/types/api";

import { TaskFormDialog } from "../task-form-dialog/TaskFormDialog";

type CreateTaskProps = {
  onCreate: (values: TaskInput) => Promise<ApiResult<unknown>>;
  onCreated?: () => void;
};

export function CreateTask({ onCreate, onCreated }: CreateTaskProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined aria-hidden />}
        onClick={() => setOpen(true)}
      >
        Новая задача
      </Button>

      <TaskFormDialog
        open={open}
        heading="Новая задача"
        submitText="Создать"
        onSubmit={onCreate}
        onSuccess={() => {
          setOpen(false);
          onCreated?.();
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
