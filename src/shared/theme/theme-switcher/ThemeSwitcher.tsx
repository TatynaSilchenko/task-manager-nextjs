"use client";

import { DesktopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import type { ReactNode } from "react";

import { useThemePreference } from "../antd-provider";
import type { ThemePreference } from "../theme-preference";

const OPTIONS = [
  { value: "light", label: "Светлая", icon: <SunOutlined aria-hidden /> },
  { value: "dark", label: "Тёмная", icon: <MoonOutlined aria-hidden /> },
  {
    value: "system",
    label: "Системная",
    icon: <DesktopOutlined aria-hidden />,
  },
] satisfies { value: ThemePreference; label: string; icon: ReactNode }[];

export function ThemeSwitcher() {
  const { preference, setPreference } = useThemePreference();

  return (
    <Segmented<ThemePreference>
      size="small"
      options={OPTIONS}
      value={preference}
      onChange={setPreference}
      aria-label="Тема оформления"
    />
  );
}
