import { NextResponse } from 'next/server'
import type { CreateWebsiteInput } from '@/types'

// GET /api/websites - Get all user's websites
export async function GET(request: Request) {
  try {
    // TODO: Get user from session/auth
    // TODO: Fetch from database

    const websites = [
      {
        id: '1',
        subdomain: 'john-mary',
        templateId: 'classic-elegance',
        published: true,
        // ... other fields
      },
    ]

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
    const body: CreateWebsiteInput = await request.json()

    // TODO: Validate input
    // TODO: Get user from session
    // TODO: Create in database

    const newWebsite = {
      id: 'generated-id',
      userId: 'user-id',
      subdomain: `${body.brideName}-${body.groomName}`.toLowerCase().replace(/\s+/g, '-'),
      templateId: body.templateId,
      published: false,
      content: {
        brideName: body.brideName,
        groomName: body.groomName,
        weddingDate: new Date(body.weddingDate),
        primaryColor: '#8B7355',
        secondaryColor: '#F5F5DC',
        fontFamily: 'Playfair Display',
        sections: {
          hero: true,
          countdown: true,
          story: true,
          events: true,
          rsvp: true,
          gallery: true,
          travel: false,
          faq: false,
        },
      },
    }

    return NextResponse.json(
      { success: true, data: newWebsite },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating website:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create website' },
      { status: 500 }
    )
  }
}
