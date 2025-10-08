import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // ignoreBuildErrors: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Generate a static export during build (Next.js 15+)
  output: 'export',
  // Keep the basePath consistent with the Pages configuration
  basePath: '/reino',
  // When deploying to GitHub Pages, static assets need the repo path prefix
  // so set assetPrefix to the same value as basePath. trailingSlash ensures
  // exported files land under directories which Pages serves correctly.
  assetPrefix: '/reino',
  trailingSlash: true,
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
