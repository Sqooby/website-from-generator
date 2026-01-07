import { NextResponse } from 'next/server'

// POST /api/rsvp - Submit RSVP
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // TODO: Validate input
    // TODO: Save to database
    // TODO: Send confirmation email

    const rsvp = {
      id: 'generated-id',
      websiteId: body.websiteId,
      guestName: body.guestName,
      email: body.email,
      attending: body.attending,
      plusOne: body.plusOne || false,
      dietaryRequirements: body.dietaryRequirements || '',
      message: body.message || '',
      createdAt: new Date(),
    }

    return NextResponse.json(
      { success: true, data: rsvp },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit RSVP' },
      { status: 500 }
    )
  }
}
