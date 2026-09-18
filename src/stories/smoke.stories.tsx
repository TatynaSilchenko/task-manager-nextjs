import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "antd";
import { expect, fn } from "storybook/test";

const meta = {
  title: "Smoke/Button",
  component: Button,
  args: { children: "Click me", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CallsOnClick: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Click me" }));

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
