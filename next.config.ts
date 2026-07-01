import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "botflow.ink" }],
        destination: "https://www.botflow.ink/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(privacy|terms|data-deletion)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "api.botflow.ink" },
    ],
  },
};

export default nextConfig;
