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
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https:",
      "media-src 'self' https: blob:",
      "frame-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
