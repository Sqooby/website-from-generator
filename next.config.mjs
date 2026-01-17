/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 90],
  },
  // Enable experimental features if needed
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Note: @cloudflare/next-on-pages handles the build output conversion
  // Do NOT use 'output: export' as it disables dynamic routing
}

export default nextConfig
