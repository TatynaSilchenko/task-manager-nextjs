import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import type { ApiResult } from "@/shared/types/api";

import { LoginForm } from "./LoginForm";

const meta = {
  title: "Auth/LoginForm",
  component: LoginForm,
  args: {
    onSubmit: fn(async (): Promise<ApiResult<unknown>> => ({
      ok: true,
      data: null,
    })),
    onSuccess: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 440 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowsValidationErrors: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    await expect(await canvas.findByText("Введите email")).toBeInTheDocument();
    await expect(await canvas.findByText("Введите пароль")).toBeInTheDocument();

    await userEvent.type(canvas.getByLabelText("Email"), "admin@");
    await userEvent.tab();

    await expect(
      await canvas.findByText("Введите корректный email"),
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const IgnoresWhitespace: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const email = canvas.getByLabelText("Email");
    await userEvent.type(email, " admin @example.com ");

    await expect(email).toHaveValue("admin@example.com");

    await userEvent.type(canvas.getByLabelText("Пароль"), "   ");
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    await expect(await canvas.findByText("Введите пароль")).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SubmitsValidCredentials: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Email"), "admin@example.com");
    await userEvent.type(canvas.getByLabelText("Пароль"), "Admin123!");
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: "admin@example.com",
      password: "Admin123!",
    });
    await expect(args.onSuccess).toHaveBeenCalledOnce();
  },
};

export const ShowsServerError: Story = {
  args: {
    onSubmit: fn(async (): Promise<ApiResult<unknown>> => ({
      ok: false,
      error: "Неверный email или пароль",
    })),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Email"), "admin@example.com");
    await userEvent.type(canvas.getByLabelText("Пароль"), "wrong-password");
    await userEvent.click(canvas.getByRole("button", { name: "Войти" }));

    await expect(
      await canvas.findByText("Неверный email или пароль"),
    ).toBeInTheDocument();
    await expect(args.onSuccess).not.toHaveBeenCalled();
    await expect(canvas.getByRole("button", { name: "Войти" })).toBeEnabled();
  },
};
