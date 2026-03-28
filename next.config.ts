import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robustta.com',
      },
    ],
  },
};

export default nextConfig;
