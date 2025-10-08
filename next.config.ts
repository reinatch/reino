import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static export during build (Next.js 15+)
  output: 'export',
  // Keep the basePath consistent with the Pages configuration
  basePath: '/reino',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
