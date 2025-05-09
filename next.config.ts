import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure image domains for external images
  images: {
    domains: ['images.unsplash.com', 'ik.imagekit.io'],
  },

  // Add any other configuration options here
  reactStrictMode: true,
};

export default nextConfig;
