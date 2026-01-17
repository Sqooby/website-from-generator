import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
// Edge Runtime doesn't support Node.js APIs like 'fs' and 'path'
export const runtime = 'nodejs'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// GET /api/websites/:id - Get single website
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    const website = await prisma.website.findUnique({
      where: { id },
      include: {
        content: true,
        photos: true,
      },
    })

    if (!website) {
      return NextResponse.json(
        { success: false, error: 'Website not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: website })
  } catch (error) {
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

    const website = await prisma.website.update({
      where: { id },
      data: {
        ...(body.published !== undefined && {
          published: body.published,
          publishedAt: body.published ? new Date() : null,
        }),
        ...(body.templateId && { templateId: body.templateId }),
        // Add other fields as needed
      },
      include: {
        content: true,
      },
    })

    // If publishing, handle Cloudflare Pages deployment
    if (body.published === true && website.subdomain) {
      const { verifyCloudflarePagesDeployment, triggerCloudflarePagesRebuild } = await import('@/lib/cloudflare/pages-deploy')
      
      // Verify deployment (dynamic routing works automatically)
      try {
        const verification = await verifyCloudflarePagesDeployment(id)
        console.log('Cloudflare Pages deployment verified:', verification)
        
        // Optional: Trigger rebuild if CLOUDFLARE_AUTO_REBUILD is enabled
        // Note: Dynamic routing works without rebuild, but rebuild ensures latest code changes
        if (process.env.CLOUDFLARE_AUTO_REBUILD === 'true') {
          // Trigger rebuild in background (don't wait for it)
          triggerCloudflarePagesRebuild().catch(error => {
            console.warn('Cloudflare Pages rebuild trigger failed (non-critical):', error)
          })
        }
      } catch (error) {
        console.warn('Cloudflare Pages verification failed (non-critical):', error)
        // Don't fail the request - dynamic routing will still work automatically
      }
    }

    return NextResponse.json({
      success: true,
      data: website,
    })
  } catch (error) {
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

    // TODO: Delete from database

    return NextResponse.json({
      success: true,
      message: 'Website deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete website' },
      { status: 500 }
    )
  }
}
