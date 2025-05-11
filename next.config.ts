import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
