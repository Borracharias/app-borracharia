import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
