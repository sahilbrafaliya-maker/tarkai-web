const nextConfig = {
  // Running as a dynamic Next.js server (not static export)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable standalone output for optimized Docker builds
  output: 'standalone',
};

export default nextConfig;
