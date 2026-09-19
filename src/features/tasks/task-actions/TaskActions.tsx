"use client";

import { MoreOutlined } from "@ant-design/icons";
import { App, Button, Dropdown, type MenuProps } from "antd";
import { useState } from "react";

import type { TaskInput } from "@/domain/task/schema";
import type { ApiResult } from "@/shared/types/api";

import { TaskFormDialog } from "../task-form-dialog/TaskFormDialog";

type TaskActionsProps = {
  task: TaskInput;
  onUpdate: (values: TaskInput) => Promise<ApiResult<unknown>>;
  onDelete: () => Promise<ApiResult<unknown>>;
  onChanged?: () => void;
};

export function TaskActions({
  task,
  onUpdate,
  onDelete,
  onChanged,
}: TaskActionsProps) {
  const { modal, message } = App.useApp();
  const [editOpen, setEditOpen] = useState(false);

  const confirmDelete = () => {
    modal.confirm({
      title: `Удалить задачу «${task.title}»?`,
      okText: "Удалить",
      okButtonProps: { danger: true },
      cancelText: "Отмена",
      onOk: async () => {
        const result = await onDelete();

        if (!result.ok) {
          message.error(result.error);
          return;
        }

        onChanged?.();
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "Редактировать",
      onClick: () => setEditOpen(true),
    },
    { key: "delete", label: "Удалить", danger: true, onClick: confirmDelete },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Button
          type="text"
          icon={<MoreOutlined />}
          aria-label={`Действия с задачей «${task.title}»`}
        />
      </Dropdown>

      <TaskFormDialog
        open={editOpen}
        heading="Редактировать задачу"
        submitText="Сохранить"
        initialValues={task}
        onSubmit={onUpdate}
        onSuccess={() => {
          setEditOpen(false);
          onChanged?.();
        }}
        onCancel={() => setEditOpen(false)}
      />
    </>
  );
}
