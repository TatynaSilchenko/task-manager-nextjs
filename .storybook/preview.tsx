import type { Preview } from "@storybook/nextjs-vite";

import { AntdProvider } from "../src/shared/theme/antd-provider";
import { manrope } from "../src/shared/theme/fonts";

import "antd/dist/reset.css";
import "../src/app/globals.css";

document.documentElement.classList.add(manrope.variable);

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
