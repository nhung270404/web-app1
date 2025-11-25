import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // cần để chạy tốt trong Docker
  images: {
    remotePatterns: [new URL('https://w.ladicdn.com/**')],
  },
};

export default nextConfig;
