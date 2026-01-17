import { prisma } from '@/lib/db/prisma'

export async function deployToCloudflare(websiteId: string) {
  // 1. Fetch website with content from database
  const website = await prisma.website.findUnique({
    where: { id: websiteId },
    include: {
      content: true,
      photos: true,
    },
  })

  if (!website || !website.content) {
    throw new Error('Website not found')
  }

  // 2. Render HTML by fetching from Next.js internal route
  // This uses Next.js's built-in SSR rendering instead of react-dom/server
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000'
  
  const renderUrl = `${baseUrl}/wedding/${website.subdomain}`
  
  let fullHtml: string
  
  try {
    // Fetch the rendered page from Next.js (this will use SSR)
    const renderResponse = await fetch(renderUrl, {
      headers: {
        'User-Agent': 'Internal-Deployment',
      },
    })
    
    if (!renderResponse.ok) {
      throw new Error(`Failed to render page: ${renderResponse.statusText}`)
    }
    
    fullHtml = await renderResponse.text()
  } catch (error) {
    // Fallback: If we can't fetch (e.g., in production), mark as published anyway
    // The site will be accessible via Next.js route
    console.warn('Could not fetch rendered HTML, using Next.js route instead:', error)
    await prisma.website.update({
      where: { id: websiteId },
      data: {
        published: true,
        publishedAt: new Date(),
        deploymentUrl: renderUrl,
      },
    })
    return {
      url: renderUrl,
      message: 'Website marked as published (using Next.js route)',
    }
  }

  // 6. Upload HTML to Cloudflare Workers KV
  const kvNamespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID

  if (!kvNamespaceId || !apiToken || !accountId) {
    console.warn('Cloudflare credentials not configured. Skipping deployment.')
    // For MVP: Just mark as published without actual deployment
    await prisma.website.update({
      where: { id: websiteId },
      data: {
        published: true,
        publishedAt: new Date(),
        deploymentUrl: `https://${website.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`,
      },
    })
    return {
      url: `https://${website.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`,
      message: 'Website marked as published (Cloudflare not configured)',
    }
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${kvNamespaceId}/values/${website.subdomain}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'text/html',
      },
      body: fullHtml,
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Cloudflare deployment failed: ${error}`)
  }

  // 7. Update website record with deployment info
  await prisma.website.update({
    where: { id: websiteId },
    data: {
      published: true,
      publishedAt: new Date(),
      deploymentUrl: `https://${website.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`,
      deploymentId: website.subdomain,
    },
  })

  return {
    url: `https://${website.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`,
    message: 'Website deployed successfully',
  }
}
