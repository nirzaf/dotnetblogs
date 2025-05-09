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
    ],
  },
  // Other Next.js config options can be added here
};

module.exports = nextConfig;
