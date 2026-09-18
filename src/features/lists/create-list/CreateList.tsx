"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

import type { ListInput } from "@/domain/list/list-schema";
import type { ApiResult } from "@/shared/types/api";

import { ListTitleDialog } from "../list-title-dialog/ListTitleDialog";

type CreateListProps = {
  onCreate: (values: ListInput) => Promise<ApiResult<unknown>>;
  onCreated?: () => void;
};

export function CreateList({ onCreate, onCreated }: CreateListProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined aria-hidden />}
        onClick={() => setOpen(true)}
      >
        Новый список
      </Button>

      <ListTitleDialog
        open={open}
        heading="Новый список"
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
