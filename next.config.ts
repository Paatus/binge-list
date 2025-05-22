import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
  experimental: {
    viewTransition: true,
    reactCompiler: true,
  },
};

export default nextConfig;
