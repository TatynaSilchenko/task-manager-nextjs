import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

import { AntdProvider } from "@/shared/ui/antd-provider";

import "antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Списки задач со статусами, приоритетами и дедлайнами",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <AntdRegistry>
          <AntdProvider>{children}</AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
