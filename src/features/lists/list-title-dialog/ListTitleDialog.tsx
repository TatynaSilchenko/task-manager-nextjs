"use client";

import { Alert, Form, Input, Modal } from "antd";
import { useState } from "react";

import {
  LIST_TITLE_MAX_LENGTH,
  type ListInput,
  listInputSchema,
} from "@/domain/list/list-schema";
import { zodRule } from "@/shared/lib/zod-rule";
import type { ApiResult } from "@/shared/types/api";

type ListTitleDialogProps = {
  open: boolean;
  heading: string;
  submitText: string;
  initialTitle?: string;
  onSubmit: (values: ListInput) => Promise<ApiResult<unknown>>;
  onSuccess: () => void;
  onCancel: () => void;
};

export function ListTitleDialog({
  open,
  heading,
  submitText,
  initialTitle = "",
  onSubmit,
  onSuccess,
  onCancel,
}: ListTitleDialogProps) {
  const [form] = Form.useForm<ListInput>();
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFinish = async (values: ListInput) => {
    const parsed = listInputSchema.safeParse(values);

    if (!parsed.success) {
      setServerError("Проверьте введённые данные");
      return;
    }

    setPending(true);
    setServerError(null);

    const result = await onSubmit(parsed.data);
    setPending(false);

    if (result.ok) {
      onSuccess();
      return;
    }

    setServerError(result.error);
    form.setFields([
      { name: "title", errors: result.fieldErrors?.title ?? [] },
    ]);
  };

  return (
    <Modal
      open={open}
      title={heading}
      okText={submitText}
      cancelText="Отмена"
      confirmLoading={pending}
      onOk={() => form.submit()}
      onCancel={onCancel}
      afterClose={() => setServerError(null)}
      destroyOnHidden
    >
      <Form<ListInput>
        form={form}
        layout="vertical"
        requiredMark={false}
        preserve={false}
        initialValues={{ title: initialTitle }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[zodRule(listInputSchema.shape.title)]}
        >
          <Input maxLength={LIST_TITLE_MAX_LENGTH} autoFocus />
        </Form.Item>

        {serverError && <Alert type="error" title={serverError} showIcon />}
      </Form>
    </Modal>
  );
}
