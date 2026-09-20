import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

import { getInitialTheme } from "@/server/theme";
import { AntdProvider } from "@/shared/theme/antd-provider";
import { manrope } from "@/shared/theme/fonts";
import { systemThemeScript } from "@/shared/theme/system-theme-script";
import { resolveTheme } from "@/shared/theme/theme-preference";

import "antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Списки задач со статусами, приоритетами и дедлайнами",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { preference, systemTheme } = await getInitialTheme();

  return (
    <html
      lang="ru"
      className={manrope.variable}
      style={{ colorScheme: resolveTheme(preference, systemTheme) }}
      data-theme-preference={preference}
      data-system-theme={systemTheme}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: systemThemeScript }} />
      </head>
      <body>
        <AntdRegistry>
          <AntdProvider
            initialPreference={preference}
            initialSystemTheme={systemTheme}
          >
            {children}
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
