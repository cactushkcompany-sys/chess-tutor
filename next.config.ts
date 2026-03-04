import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/chess-tutor',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
