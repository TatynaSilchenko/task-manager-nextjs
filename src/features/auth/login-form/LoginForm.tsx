"use client";

import { Button, Form, Input } from "antd";

import { type LoginInput, loginSchema } from "@/domain/auth/login-schema";
import { zodRule } from "@/shared/lib/zod-rule";

type LoginFormProps = {
  onSubmit?: (values: LoginInput) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <Form<LoginInput>
      layout="vertical"
      requiredMark={false}
      validateTrigger="onBlur"
      onFinish={onSubmit}
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

      <Button type="primary" htmlType="submit" size="large" block>
        Войти
      </Button>
    </Form>
  );
}
