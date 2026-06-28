import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Kiran-Website" : "",
  assetPrefix: isProd ? "/Kiran-Website/" : "",
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
