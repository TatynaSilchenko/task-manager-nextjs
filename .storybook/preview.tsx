import type { Preview } from "@storybook/nextjs-vite";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { ReactNode } from "react";

import { AntdProvider } from "../src/shared/theme/antd-provider";
import { manrope } from "../src/shared/theme/fonts";
import type { ResolvedTheme } from "../src/shared/theme/theme-preference";

import "antd/dist/reset.css";
import "../src/app/globals.css";

document.documentElement.classList.add(manrope.variable);

type StoryThemeProviderProps = {
  theme: { name: ResolvedTheme };
  children: ReactNode;
};

function StoryThemeProvider({ theme, children }: StoryThemeProviderProps) {
  return (
    <AntdProvider
      key={theme.name}
      initialPreference={theme.name}
      initialSystemTheme={theme.name}
    >
      <div
        style={{
          minHeight: "100vh",
          padding: "var(--ant-padding-lg)",
          background: "var(--ant-color-bg-layout)",
        }}
      >
        {children}
      </div>
    </AntdProvider>
  );
}

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      Provider: StoryThemeProvider,
      themes: { light: { name: "light" }, dark: { name: "dark" } },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
