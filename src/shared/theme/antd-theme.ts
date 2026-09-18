import { theme, type ThemeConfig } from "antd";

const fontFamily =
  'var(--font-manrope), system-ui, -apple-system, "Segoe UI", sans-serif';

const sharedToken = {
  fontFamily,
  borderRadius: 2,
  borderRadiusLG: 4,
  borderRadiusSM: 2,
  controlHeight: 30,
  wireframe: false,
} satisfies ThemeConfig["token"];

const sharedComponents = {
  Table: { cellPaddingBlock: 8, headerSplitColor: "transparent" },
  Card: { paddingLG: 16 },
  Form: { itemMarginBottom: 16 },
  Layout: { headerHeight: 48 },
} satisfies ThemeConfig["components"];

export const lightTheme: ThemeConfig = {
  token: {
    ...sharedToken,
    colorPrimary: "#2A2F36",
    colorInfo: "#5B7A8C",
    colorSuccess: "#5B7A8C",
    colorWarning: "#C77800",
    colorError: "#C03221",
    colorTextBase: "#14171A",
    colorBgBase: "#FFFFFF",
    colorBgLayout: "#FBFBFA",
    colorBorder: "#E3E3E0",
    colorBorderSecondary: "#ECECE9",
  },
  components: {
    ...sharedComponents,
    Layout: { ...sharedComponents.Layout, headerBg: "#FFFFFF" },
    Table: { ...sharedComponents.Table, headerBg: "#F3F3F1" },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...sharedToken,
    colorPrimary: "#D6D3CD",
    colorInfo: "#7FA0B3",
    colorSuccess: "#7FA0B3",
    colorWarning: "#E09B3D",
    colorError: "#E2574A",
    colorTextBase: "#EDEDEB",
    colorBgBase: "#121212",
    colorBgLayout: "#0E0E0E",
    colorBorder: "#2F2F2E",
    colorBorderSecondary: "#252524",
  },
  components: {
    ...sharedComponents,
    Layout: { ...sharedComponents.Layout, headerBg: "#1B1B1B" },
    Table: { ...sharedComponents.Table, headerBg: "#1F1F1E" },
  },
};
