import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static export during build (Next.js 15+)
  output: 'export',
  // Keep the basePath consistent with the Pages configuration
  basePath: '/reino',
  images: {
    unoptimized: true,
    domains: [
      'picsum.photos',
      'artworks.pt',
      'noentulho.com',
      'joana-peres.com',
      'veramota.com',
      'valentinapelayoatilano.com',
      'offworld.live',
      'www.primeira-idade.pt',
      'primeira-idade.pt'
    ],
  },
};

export default nextConfig;
