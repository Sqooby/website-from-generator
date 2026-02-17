import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { websiteService, SubdomainTakenError } from '@/server/services/website.service'
import { createWebsiteSchema } from '@/server/validators/website.schema'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
export const runtime = 'nodejs'

// GET /api/websites - Get all websites for authenticated user
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const websites = await websiteService.listWebsites(session.user.id)
    return NextResponse.json({ success: true, data: websites })
  } catch (error) {
    console.error('Error fetching websites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch websites' },
      { status: 500 }
    )
  }
}

// POST /api/websites - Create a new website
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = createWebsiteSchema.parse(body)
    const website = await websiteService.createWebsite(validated, session.user.id)
    return NextResponse.json({ success: true, data: website }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    if (error instanceof SubdomainTakenError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    console.error('Error creating website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create website' },
      { status: 500 }
    )
  }
}
