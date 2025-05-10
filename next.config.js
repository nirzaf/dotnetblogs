/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure remote image patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Add other configuration options
  reactStrictMode: true,
  swcMinify: true,
  // Increase the timeout for builds on Vercel
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
