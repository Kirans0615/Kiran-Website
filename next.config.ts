import type { NextConfig } from "next";
import path from "path";

// Only set static export when building for GitHub Pages
const isGHPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGHPages && {
    output: "export",
    basePath: "/Kiran-Website",
    assetPrefix: "/Kiran-Website/",
  }),
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "*.github.io" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "omalleyfabrics.com" },
      { protocol: "https", hostname: "empowerestatesnetwork.com" },
    ],
  },
};

export default nextConfig;
