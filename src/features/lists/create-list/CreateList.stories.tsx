import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, waitFor } from "storybook/test";

import type { ApiResult } from "@/shared/types/api";

import { CreateList } from "./CreateList";

const meta = {
  title: "Lists/CreateList",
  component: CreateList,
  args: {
    onCreate: fn(async (): Promise<ApiResult<unknown>> => ({
      ok: true,
      data: null,
    })),
    onCreated: fn(),
  },
} satisfies Meta<typeof CreateList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CreatesList: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Новый список" }));

    const dialog = await screen.findByRole("dialog");
    await userEvent.type(
      await screen.findByLabelText("Название"),
      "  Командировка  ",
    );
    await userEvent.click(screen.getByRole("button", { name: "Создать" }));

    await waitFor(() =>
      expect(args.onCreate).toHaveBeenCalledWith({ title: "Командировка" }),
    );
    await waitFor(() => expect(args.onCreated).toHaveBeenCalled());
    await waitFor(() => expect(dialog).not.toBeVisible());
  },
};
