import type { Preview } from "@storybook/nextjs-vite";

import { AntdProvider } from "../src/shared/theme/antd-provider";
import { manrope } from "../src/shared/theme/fonts";

import "antd/dist/reset.css";
import "../src/app/globals.css";

// В приложении класс шрифта ставит layout.tsx на <html>; Storybook layout не использует.
// Ставим на <html>, а не на обёртку истории, чтобы шрифт видели и порталы antd (Modal, Select).
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
