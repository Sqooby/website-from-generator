import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rsvpService, WebsiteNotFoundError } from '@/server/services/rsvp.service'
import { rsvpSchema } from '@/server/validators/rsvp.schema'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
export const runtime = 'nodejs'

// CORS headers for deployed wedding sites to call this endpoint
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// POST /api/rsvp - Submit RSVP
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = rsvpSchema.parse(body)
    const rsvp = await rsvpService.submitRsvp(validated)
    return NextResponse.json({ success: true, data: rsvp }, { status: 201, headers: corsHeaders })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400, headers: corsHeaders }
      )
    }
    if (error instanceof WebsiteNotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404, headers: corsHeaders }
      )
    }
    console.error('Error submitting RSVP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit RSVP' },
      { status: 500, headers: corsHeaders }
    )
  }
}
