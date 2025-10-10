import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ignoreBuildErrors: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Build settings: this project is typically served from the domain root
  // when deployed to your own server, so do not force a basePath or static
  // export here. Keep images unoptimized for external domains.
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
