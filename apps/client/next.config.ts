import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply to all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, // Replace * with your domain
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
