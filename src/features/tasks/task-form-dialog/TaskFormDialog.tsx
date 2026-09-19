"use client";

import { Modal } from "antd";

import type { TaskInput } from "@/domain/task/schema";
import type { ApiResult } from "@/shared/types/api";

import { TaskForm } from "../task-form/TaskForm";

type TaskFormDialogProps = {
  open: boolean;
  heading: string;
  submitText: string;
  initialValues?: TaskInput;
  onSubmit: (values: TaskInput) => Promise<ApiResult<unknown>>;
  onSuccess: () => void;
  onCancel: () => void;
};

export function TaskFormDialog({
  open,
  heading,
  submitText,
  initialValues,
  onSubmit,
  onSuccess,
  onCancel,
}: TaskFormDialogProps) {
  return (
    <Modal
      open={open}
      title={heading}
      footer={null}
      onCancel={onCancel}
      destroyOnHidden
    >
      <TaskForm
        initialValues={initialValues}
        submitText={submitText}
        autoFocus
        onSubmit={onSubmit}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Modal>
  );
}
