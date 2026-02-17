import { NextResponse } from 'next/server'
import { z } from 'zod'
import { websiteService, WebsiteNotFoundError } from '@/server/services/website.service'
import { updateWebsiteSchema } from '@/server/validators/website.schema'
import { config } from '@/lib/config/env'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/websites/:id - Get single website
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const website = await websiteService.getWebsite(id)
    return NextResponse.json({ success: true, data: website })
  } catch (error) {
    if (error instanceof WebsiteNotFoundError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    console.error('Error fetching website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch website' },
      { status: 500 }
    )
  }
}

// PATCH /api/websites/:id - Update website
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const validated = updateWebsiteSchema.parse(body)
    const website = await websiteService.updateWebsite(id, validated)

    // If publishing, verify Cloudflare Pages deployment (non-critical)
    if (validated.published === true && website.subdomain) {
      const { verifyCloudflarePagesDeployment, triggerCloudflarePagesRebuild } = await import(
        '@/lib/cloudflare/pages-deploy'
      )

      try {
        const verification = await verifyCloudflarePagesDeployment(id)
        console.log('Cloudflare Pages deployment verified:', verification)

        if (config.cloudflare.autoRebuild) {
          triggerCloudflarePagesRebuild().catch((err) => {
            console.warn('Cloudflare Pages rebuild trigger failed (non-critical):', err)
          })
        }
      } catch (err) {
        console.warn('Cloudflare Pages verification failed (non-critical):', err)
      }
    }

    return NextResponse.json({ success: true, data: website })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    if (error instanceof WebsiteNotFoundError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    console.error('Error updating website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update website' },
      { status: 500 }
    )
  }
}

// DELETE /api/websites/:id - Delete website
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    await websiteService.deleteWebsite(id)
    return NextResponse.json({ success: true, message: 'Website deleted successfully' })
  } catch (error) {
    if (error instanceof WebsiteNotFoundError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 })
    }
    console.error('Error deleting website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete website' },
      { status: 500 }
    )
  }
}
