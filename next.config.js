/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "mui.com"], // Add your domains here
  },
  experimental: {
    reactCompiler: true,
    //ppr: 'incremental',
  },
};

module.exports = nextConfig;
