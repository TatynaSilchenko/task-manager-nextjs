"use client";

import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import type { ReactNode } from "react";

import { lightTheme } from "./antd-theme";

type AntdProviderProps = {
  children: ReactNode;
};

export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider locale={ruRU} theme={lightTheme}>
      {children}
    </ConfigProvider>
  );
}
