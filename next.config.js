/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable server actions for better form handling
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-domain.com'],
    },
    // Enable optimized package imports
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  // Enable turbopack (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Enable priority loading for above-the-fold images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable static generation where possible
  trailingSlash: false,
  // Enable compression
  compress: true,
  // Enable HTTP/2 Server Push
  poweredByHeader: false,
  // Enable security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
