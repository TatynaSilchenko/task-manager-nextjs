"use client";

import { MoreOutlined } from "@ant-design/icons";
import { App, Button, Dropdown, type MenuProps } from "antd";
import { useState } from "react";

import type { ListInput } from "@/domain/list/list-schema";
import type { ApiResult } from "@/shared/types/api";

import { ListTitleDialog } from "../list-title-dialog/ListTitleDialog";

type ListActionsProps = {
  title: string;
  onRename: (values: ListInput) => Promise<ApiResult<unknown>>;
  onDelete: () => Promise<ApiResult<unknown>>;
  onChanged?: () => void;
};

export function ListActions({
  title,
  onRename,
  onDelete,
  onChanged,
}: ListActionsProps) {
  const { modal, message } = App.useApp();
  const [renameOpen, setRenameOpen] = useState(false);

  const confirmDelete = () => {
    modal.confirm({
      title: `Удалить список «${title}»?`,
      content: "Задачи этого списка тоже будут удалены.",
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
      key: "rename",
      label: "Переименовать",
      onClick: () => setRenameOpen(true),
    },
    { key: "delete", label: "Удалить", danger: true, onClick: confirmDelete },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Button
          type="text"
          icon={<MoreOutlined />}
          aria-label={`Действия со списком «${title}»`}
        />
      </Dropdown>

      <ListTitleDialog
        open={renameOpen}
        heading="Переименовать список"
        submitText="Сохранить"
        initialTitle={title}
        onSubmit={onRename}
        onSuccess={() => {
          setRenameOpen(false);
          onChanged?.();
        }}
        onCancel={() => setRenameOpen(false)}
      />
    </>
  );
}
