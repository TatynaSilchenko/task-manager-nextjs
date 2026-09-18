import { theme, type ThemeConfig } from "antd";

const fontFamily =
  'var(--font-manrope), system-ui, -apple-system, "Segoe UI", sans-serif';

const sharedToken = {
  fontFamily,
  fontSize: 15,
  borderRadius: 8,
  borderRadiusLG: 12,
  borderRadiusSM: 6,
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightSM: 32,
  wireframe: false,
} satisfies ThemeConfig["token"];

const sharedComponents = {
  Button: { fontWeight: 600, primaryShadow: "none", borderRadiusLG: 10 },
  Input: { paddingInline: 14 },
  Table: { cellPaddingBlock: 12, headerSplitColor: "transparent" },
  Card: { paddingLG: 24 },
  Form: { itemMarginBottom: 20, verticalLabelPadding: "0 0 6px" },
  Layout: { headerHeight: 56 },
} satisfies ThemeConfig["components"];

export const lightTheme: ThemeConfig = {
  token: {
    ...sharedToken,
    colorPrimary: "#18181B",
    colorInfo: "#5B7A8C",
    colorSuccess: "#5B7A8C",
    colorWarning: "#C77800",
    colorError: "#C03221",
    colorTextBase: "#14171A",
    colorBgBase: "#FFFFFF",
    colorBgLayout: "#FBFBFA",
    colorBorder: "#D4D4D8",
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
