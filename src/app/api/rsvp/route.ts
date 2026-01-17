import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

export const runtime = 'edge'

// Validation schema
const rsvpSchema = z.object({
  subdomain: z.string(),
  guestName: z.string().min(1),
  email: z.string().email(),
  attending: z.boolean(),
  plusOne: z.boolean().optional(),
  plusOneName: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  message: z.string().optional(),
})

// CORS headers for deployed wedding sites to call this endpoint
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

// POST /api/rsvp - Submit RSVP
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = rsvpSchema.parse(body)

    // Find website by subdomain
    const website = await prisma.website.findUnique({
      where: { subdomain: validatedData.subdomain },
    })

    if (!website) {
      return NextResponse.json(
        { success: false, error: 'Website not found' },
        { status: 404, headers: corsHeaders }
      )
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        websiteId: website.id,
        guestName: validatedData.guestName,
        email: validatedData.email,
        attending: validatedData.attending,
        plusOne: validatedData.plusOne || false,
        plusOneName: validatedData.plusOneName,
        dietaryRequirements: validatedData.dietaryRequirements,
        message: validatedData.message,
      },
    })

    return NextResponse.json(
      { success: true, data: rsvp },
      { status: 201, headers: corsHeaders }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400, headers: corsHeaders }
      )
    }

    console.error('Error submitting RSVP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit RSVP' },
      { status: 500, headers: corsHeaders }
    )
  }
}
