"use client";

import { Alert, Button, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";

import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  type TaskInput,
  taskInputSchema,
} from "@/domain/task/schema";
import { TASK_PRIORITIES, TASK_STATUSES } from "@/domain/types/task";
import { fromPickerValue, toPickerValue } from "@/shared/lib/date";
import { zodRule } from "@/shared/lib/zod-rule";
import type { ApiResult } from "@/shared/types/api";
import formStyles from "@/shared/ui/form/form.module.css";

import { PRIORITY_LABEL, STATUS_LABEL } from "../task-labels";
import styles from "./TaskForm.module.css";

const FIELD_NAMES: (keyof TaskInput)[] = [
  "title",
  "description",
  "status",
  "priority",
  "deadline",
];

const STATUS_OPTIONS = TASK_STATUSES.map((value) => ({
  value,
  label: STATUS_LABEL[value],
}));

const PRIORITY_OPTIONS = TASK_PRIORITIES.map((value) => ({
  value,
  label: PRIORITY_LABEL[value],
}));

const EMPTY_TASK: Partial<TaskInput> = {
  title: "",
  description: "",
  status: "new",
  priority: "medium",
};

type TaskFormProps = {
  initialValues?: TaskInput;
  submitText: string;
  autoFocus?: boolean;
  onSubmit: (values: TaskInput) => Promise<ApiResult<unknown>>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function TaskForm({
  initialValues,
  submitText,
  autoFocus = false,
  onSubmit,
  onSuccess,
  onCancel,
}: TaskFormProps) {
  const [form] = Form.useForm<TaskInput>();
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFinish = async (values: TaskInput) => {
    const parsed = taskInputSchema.safeParse(values);

    if (!parsed.success) {
      setServerError("Проверьте введённые данные");
      return;
    }

    setPending(true);
    setServerError(null);

    const result = await onSubmit(parsed.data);
    setPending(false);

    if (result.ok) {
      onSuccess?.();
      return;
    }

    setServerError(result.error);
    form.setFields(
      FIELD_NAMES.map((name) => ({
        name,
        errors: result.fieldErrors?.[name] ?? [],
      })),
    );
  };

  return (
    <Form<TaskInput>
      className={formStyles.form}
      form={form}
      layout="vertical"
      requiredMark={false}
      preserve={false}
      initialValues={initialValues ?? EMPTY_TASK}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Название"
        name="title"
        rules={[zodRule(taskInputSchema.shape.title)]}
      >
        <Input maxLength={TASK_TITLE_MAX_LENGTH} autoFocus={autoFocus} />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[zodRule(taskInputSchema.shape.description)]}
      >
        <Input.TextArea
          maxLength={TASK_DESCRIPTION_MAX_LENGTH}
          autoSize={{ minRows: 3, maxRows: 8 }}
        />
      </Form.Item>

      <div className={styles.row}>
        <Form.Item
          label="Статус"
          name="status"
          rules={[zodRule(taskInputSchema.shape.status)]}
        >
          <Select options={STATUS_OPTIONS} />
        </Form.Item>

        <Form.Item
          label="Приоритет"
          name="priority"
          rules={[zodRule(taskInputSchema.shape.priority)]}
        >
          <Select options={PRIORITY_OPTIONS} />
        </Form.Item>
      </div>

      <Form.Item
        label="Дедлайн"
        name="deadline"
        rules={[zodRule(taskInputSchema.shape.deadline)]}
        getValueProps={(value?: string) => ({ value: toPickerValue(value) })}
        normalize={fromPickerValue}
      >
        <DatePicker
          className={styles.datePicker}
          showTime={{ format: "HH:mm" }}
          showNow={false}
          format="DD.MM.YYYY HH:mm"
        />
      </Form.Item>

      {serverError && (
        <Alert
          className={styles.error}
          type="error"
          title={serverError}
          showIcon
        />
      )}

      <div className={styles.actions}>
        {onCancel && <Button onClick={onCancel}>Отмена</Button>}
        <Button type="primary" loading={pending} onClick={() => form.submit()}>
          {submitText}
        </Button>
      </div>
    </Form>
  );
}
