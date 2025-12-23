/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Try disabling turbopack if it's causing issues
    // turbo: {
    //   resolveAlias: {
    //     // Add any aliases needed
    //   }
    // }
  },
}

export default nextConfig