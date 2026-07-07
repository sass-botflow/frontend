import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // CI runs lint/typecheck; skip in EasyPanel Docker builds to cut ~1–2 min off build time.
  eslint: { ignoreDuringBuilds: process.env.DOCKER_BUILD === "1" },
  typescript: { ignoreBuildErrors: process.env.DOCKER_BUILD === "1" },
  async redirects() {
    return [
      {
        source: "/dashboard/whatsapp-profiles",
        destination: "/dashboard/channels",
        permanent: true,
      },
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
