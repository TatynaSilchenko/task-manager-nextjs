import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { AntdProvider } from "@/shared/theme/antd-provider";

import "antd/dist/reset.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

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
