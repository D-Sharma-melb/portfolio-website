import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        // allow external example images used in seeds / placeholder covers
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};

export default nextConfig;
