"use client";

import { App, ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import type { ReactNode } from "react";

import { lightTheme } from "./antd-theme";

type AntdProviderProps = {
  children: ReactNode;
};

// App рендерит обёртку с классом css-var-*: antd объявляет CSS-переменные темы
// на этом классе, и без обёртки var(--ant-*) недоступны в наших CSS Modules.
export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider locale={ruRU} theme={lightTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
