"use client";

import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";

import { type LoginInput, loginSchema } from "@/domain/auth/login-schema";
import { zodRule } from "@/shared/lib/zod-rule";
import type { ApiResult } from "@/shared/types/api";

const FIELD_NAMES: (keyof LoginInput)[] = ["email", "password"];

type LoginFormProps = {
  onSubmit: (values: LoginInput) => Promise<ApiResult<unknown>>;
  onSuccess?: () => void;
};

export function LoginForm({ onSubmit, onSuccess }: LoginFormProps) {
  const [form] = Form.useForm<LoginInput>();
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFinish = async (values: LoginInput) => {
    setPending(true);
    setServerError(null);

    const result = await onSubmit(values);

    if (result.ok) {
      onSuccess?.();
      return;
    }

    setPending(false);
    setServerError(result.error);
    form.setFields(
      FIELD_NAMES.map((name) => ({
        name,
        errors: result.fieldErrors?.[name] ?? [],
      })),
    );
  };

  return (
    <Form<LoginInput>
      form={form}
      layout="vertical"
      requiredMark={false}
      validateTrigger="onBlur"
      onFinish={handleFinish}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[zodRule(loginSchema.shape.email)]}
        normalize={(value: string) => value.replace(/\s/g, "")}
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[zodRule(loginSchema.shape.password)]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>

      {serverError && (
        <Form.Item>
          <Alert type="error" title={serverError} showIcon />
        </Form.Item>
      )}

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        loading={pending}
      >
        Войти
      </Button>
    </Form>
  );
}
