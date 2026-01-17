/**
 * Cloudflare Pages Deployment Helper
 * 
 * This handles automatic deployment of wedding websites to Cloudflare Pages
 * when using @cloudflare/next-on-pages, dynamic routing works automatically.
 * 
 * For static HTML deployment (alternative), see deploy.ts
 */

import { prisma } from '@/lib/db/prisma'

/**
 * Verify that a website is ready for deployment
 * This is called after publishing to ensure everything is set up correctly
 */
export async function verifyCloudflarePagesDeployment(websiteId: string) {
  const website = await prisma.website.findUnique({
    where: { id: websiteId },
    include: {
      content: true,
    },
  })

  if (!website || !website.content) {
    throw new Error('Website not found')
  }

  if (!website.published) {
    throw new Error('Website is not published')
  }

  if (!website.subdomain) {
    throw new Error('Website subdomain is missing')
  }

  // With @cloudflare/next-on-pages, dynamic routing works automatically
  // The middleware will handle subdomain → /wedding/[subdomain] routing
  // No manual deployment needed!

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000'
  const websiteUrl = `https://${website.subdomain}.${mainDomain}`

  return {
    success: true,
    url: websiteUrl,
    message: 'Website is live via Cloudflare Pages dynamic routing',
    note: 'No manual deployment needed - Next.js handles routing automatically',
  }
}

/**
 * Optional: Trigger Cloudflare Pages rebuild if needed
 * This is only necessary if you want to force a rebuild of the entire site
 */
export async function triggerCloudflarePagesRebuild() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN
  const projectName = process.env.CLOUDFLARE_PAGES_PROJECT_NAME || 'website-from-generator'

  if (!accountId || !apiToken) {
    console.warn('Cloudflare credentials not configured. Skipping rebuild trigger.')
    return { success: false, message: 'Cloudflare credentials not configured' }
  }

  try {
    // Trigger a new deployment
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Deploy from production branch
          branch: 'main',
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to trigger rebuild: ${error}`)
    }

    return {
      success: true,
      message: 'Cloudflare Pages rebuild triggered',
    }
  } catch (error) {
    console.error('Error triggering Cloudflare Pages rebuild:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

