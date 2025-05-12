/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
  },
};

// next.config.js (example)
module.exports = {
  swcMinify: true,
  experimental: {
    enableTracing: true
  }
}




module.exports = nextConfig;
