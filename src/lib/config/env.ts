/**
 * Centralized environment configuration
 * Single source of truth for all environment variables
 */
export const config = {
  app: {
    mainDomain: process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000',
    appUrl:
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      'http://localhost:3000',
  },
  cloudflare: {
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    projectName:
      process.env.CLOUDFLARE_PAGES_PROJECT_NAME || 'website-from-generator',
    kvNamespaceId: process.env.CLOUDFLARE_KV_NAMESPACE_ID,
    autoRebuild: process.env.CLOUDFLARE_AUTO_REBUILD === 'true',
  },
}
