import type { NextConfig } from "next";

const SYSTEM_THEME_HINT = "Sec-CH-Prefers-Color-Scheme";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Accept-CH", value: SYSTEM_THEME_HINT },
          { key: "Critical-CH", value: SYSTEM_THEME_HINT },
        ],
      },
    ];
  },
};

export default nextConfig;
