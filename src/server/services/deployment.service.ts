/**
 * Deployment Service
 * Single responsibility: orchestrate website deployment
 * Uses websiteRepository for data access, cloudflare client for API calls
 * Does NOT import Prisma directly
 */

import { websiteRepository } from '@/server/repositories/website.repository'
import { config } from '@/lib/config/env'

export class DeploymentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DeploymentError'
  }
}

async function triggerCloudflareRebuild(): Promise<{ success: boolean; message: string }> {
  const { apiToken, accountId, projectName } = config.cloudflare

  if (!accountId || !apiToken) {
    return { success: false, message: 'Cloudflare credentials not configured' }
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ branch: 'main' }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new DeploymentError(`Failed to trigger rebuild: ${error}`)
  }

  return { success: true, message: 'Cloudflare Pages rebuild triggered' }
}

async function uploadToKv(subdomain: string, html: string): Promise<void> {
  const { apiToken, accountId, kvNamespaceId } = config.cloudflare

  if (!kvNamespaceId || !apiToken || !accountId) {
    throw new DeploymentError('Cloudflare KV credentials not configured')
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${kvNamespaceId}/values/${subdomain}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'text/html',
      },
      body: html,
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new DeploymentError(`Cloudflare KV deployment failed: ${error}`)
  }
}

export const deploymentService = {
  /**
   * Verify that a website is ready and return its public URL
   * Used after publishing to confirm the site is accessible
   */
  async verify(websiteId: string) {
    const website = await websiteRepository.findByIdWithContent(websiteId)

    if (!website || !website.content) throw new DeploymentError('Website not found')
    if (!website.published) throw new DeploymentError('Website is not published')
    if (!website.subdomain) throw new DeploymentError('Website subdomain is missing')

    const websiteUrl = `https://${website.subdomain}.${config.app.mainDomain}`

    return {
      success: true,
      url: websiteUrl,
      message: 'Website is live via Cloudflare Pages dynamic routing',
    }
  },

  /**
   * Deploy website via Cloudflare KV (static HTML approach)
   * Fetches rendered HTML from Next.js route and uploads to KV
   */
  async deployToKv(websiteId: string) {
    const website = await websiteRepository.findById(websiteId)

    if (!website || !website.content) throw new DeploymentError('Website not found')

    const renderUrl = `${config.app.appUrl}/wedding/${website.subdomain}`
    const deploymentUrl = `https://${website.subdomain}.${config.app.mainDomain}`

    try {
      const renderResponse = await fetch(renderUrl, {
        headers: { 'User-Agent': 'Internal-Deployment' },
      })

      if (!renderResponse.ok) {
        throw new DeploymentError(`Failed to render page: ${renderResponse.statusText}`)
      }

      const html = await renderResponse.text()

      const { kvNamespaceId, apiToken, accountId } = config.cloudflare

      if (!kvNamespaceId || !apiToken || !accountId) {
        // No KV configured - mark as published using Next.js route
        await websiteRepository.update(websiteId, {
          deploymentUrl: renderUrl,
        })
        return { url: renderUrl, message: 'Website marked as published (Cloudflare not configured)' }
      }

      await uploadToKv(website.subdomain, html)
    } catch {
      // Render failed - mark as published anyway (Next.js route will serve it)
      await websiteRepository.update(websiteId, { deploymentUrl: renderUrl })
      return { url: renderUrl, message: 'Website marked as published (using Next.js route)' }
    }

    await websiteRepository.update(websiteId, {
      deploymentUrl,
      deploymentId: website.subdomain,
    })

    return { url: deploymentUrl, message: 'Website deployed successfully' }
  },

  /**
   * Optionally trigger a full Cloudflare Pages rebuild
   * Only needed when CLOUDFLARE_AUTO_REBUILD=true
   */
  async triggerRebuild() {
    return triggerCloudflareRebuild()
  },
}
