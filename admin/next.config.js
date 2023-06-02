/** @type {import('next').NextConfig} */

const BACKEND_URL = process.env.BACKEND_URL;
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
