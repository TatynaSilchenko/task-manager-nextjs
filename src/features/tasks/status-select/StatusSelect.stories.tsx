import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, screen, waitFor } from "storybook/test";

import type { ApiResult } from "@/shared/types/api";

import { StatusSelect } from "./StatusSelect";

const meta = {
  title: "Tasks/StatusSelect",
  component: StatusSelect,
  args: {
    status: "new",
    taskTitle: "Прогнать регресс",
    onChange: fn(async (): Promise<ApiResult<unknown>> => ({
      ok: true,
      data: null,
    })),
    onChanged: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatusSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChangesStatus: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("combobox", {
        name: "Статус задачи «Прогнать регресс»",
      }),
    );
    await userEvent.click(await screen.findByTitle("Готово"));

    await waitFor(() => expect(args.onChange).toHaveBeenCalledWith("done"));
    await waitFor(() => expect(args.onChanged).toHaveBeenCalled());
  },
};
