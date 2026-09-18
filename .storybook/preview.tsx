import type { Preview } from "@storybook/nextjs-vite";

import { AntdProvider } from "../src/shared/theme/antd-provider";

import "antd/dist/reset.css";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AntdProvider>
        <Story />
      </AntdProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
