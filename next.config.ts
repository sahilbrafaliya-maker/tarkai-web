const nextConfig = {
  // Running as a dynamic Next.js server (not static export)
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable standalone output for optimized Docker builds
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['react-icons', 'react-icons/fa', 'react-icons/fi', 'react-icons/ai', 'react-icons/bs', 'react-icons/md', 'react-icons/ri'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
