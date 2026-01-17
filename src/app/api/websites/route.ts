import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

export const runtime = 'edge'

// Validation schema
const createWebsiteSchema = z.object({
  subdomain: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  templateId: z.string(),
  brideName: z.string().min(1),
  groomName: z.string().min(1),
  weddingDate: z.string(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  storyTitle: z.string().optional(),
  storyContent: z.string().optional(),
  ceremonyVenue: z.string().optional(),
  ceremonyAddress: z.string().optional(),
  receptionVenue: z.string().optional(),
  receptionAddress: z.string().optional(),
  sections: z.object({
    hero: z.boolean(),
    countdown: z.boolean(),
    story: z.boolean(),
    events: z.boolean(),
    rsvp: z.boolean(),
    gallery: z.boolean(),
    travel: z.boolean(),
    faq: z.boolean(),
  }).optional(),
})

// GET /api/websites - Get all websites
export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      include: {
        content: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

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
    const body = await request.json()

    // Validate input
    const validatedData = createWebsiteSchema.parse(body)

    // Check if subdomain already exists
    const existing = await prisma.website.findUnique({
      where: { subdomain: validatedData.subdomain },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Subdomain already taken' },
        { status: 400 }
      )
    }

    // Create website with content in a transaction
    const website = await prisma.website.create({
      data: {
        subdomain: validatedData.subdomain,
        templateId: validatedData.templateId,
        published: false,
        content: {
          create: {
            brideName: validatedData.brideName,
            groomName: validatedData.groomName,
            weddingDate: new Date(validatedData.weddingDate),
            primaryColor: validatedData.primaryColor || '#8B7355',
            secondaryColor: validatedData.secondaryColor || '#F5F5DC',
            accentColor: validatedData.accentColor || '#D4AF37',
            fontFamily: 'Playfair Display',
            storyTitle: validatedData.storyTitle,
            storyContent: validatedData.storyContent,
            ceremonyVenue: validatedData.ceremonyVenue,
            ceremonyAddress: validatedData.ceremonyAddress,
            receptionVenue: validatedData.receptionVenue,
            receptionAddress: validatedData.receptionAddress,
            sections: JSON.stringify(validatedData.sections || {
              hero: true,
              countdown: true,
              story: true,
              events: true,
              rsvp: true,
              gallery: true,
              travel: false,
              faq: false,
            }),
          },
        },
      },
      include: {
        content: true,
      },
    })

    return NextResponse.json(
      { success: true, data: website },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
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
