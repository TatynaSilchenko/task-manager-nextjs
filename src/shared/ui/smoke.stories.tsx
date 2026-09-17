import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

type SmokeButtonProps = {
  onClick: () => void;
};

function SmokeButton({ onClick }: SmokeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded bg-foreground px-3 py-1.5 text-background"
    >
      Click me
    </button>
  );
}

const meta = {
  title: "Smoke/Button",
  component: SmokeButton,
  args: { onClick: fn() },
} satisfies Meta<typeof SmokeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CallsOnClick: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Click me" }));

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
