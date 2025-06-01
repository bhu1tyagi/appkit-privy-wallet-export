import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable experimental features for better Web3 compatibility
  experimental: {
    // Reduce hydration mismatches
    optimizeCss: true,
  },
  
  // Webpack configuration for better compatibility with Solana libraries
  webpack: (config, { isServer }) => {
    // Handle node modules that don't work well with webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
  
  // Headers for better security and Web3 compatibility
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
  
  // Transpile packages that need it
  transpilePackages: [
    '@privy-io/react-auth',
  ],
  
  // Optimize images
  images: {
    domains: ['dashboard.privy.io'],
  },
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
