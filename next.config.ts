import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development",
  disable: false, // Habilitado em dev para testar o botão de instalação
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,

  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://api-borracharia.onrender.com/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [{ key: "Content-Type", value: "application/manifest+json" }],
      },
      {
        source: "/sw.js",
        headers: [{ key: "Content-Type", value: "application/javascript" }],
      },
    ];
  },
};

export default withPWAConfig(nextConfig);
