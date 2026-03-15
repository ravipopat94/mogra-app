import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/catalog", destination: "/bespoke-shirts", permanent: true },
      { source: "/catalog/men", destination: "/bespoke-shirts", permanent: true },
      { source: "/catalog/men/:slug", destination: "/bespoke-shirts/:slug", permanent: true },
      { source: "/catalog/men/:slug/styled", destination: "/bespoke-shirts/:slug/styled", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
