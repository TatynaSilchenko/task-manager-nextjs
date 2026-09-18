import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

import { AntdProvider } from "@/shared/theme/antd-provider";
import { manrope } from "@/shared/theme/fonts";

import "antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Списки задач со статусами, приоритетами и дедлайнами",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <AntdRegistry>
          <AntdProvider>{children}</AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
