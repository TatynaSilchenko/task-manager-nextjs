"use client";

import { Button, Form, Input } from "antd";

export function LoginForm() {
  return (
    <Form layout="vertical">
      <Form.Item label="Email" name="email">
        <Input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item label="Пароль" name="password">
        <Input.Password autoComplete="current-password" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Войти
      </Button>
    </Form>
  );
}
