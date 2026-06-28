import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "*.github.io" },
      { protocol: "https", hostname: "omalleyfabrics.com" },
      { protocol: "https", hostname: "empowerestatesnetwork.com" },
    ],
  },
};

export default nextConfig;
