import { NextResponse } from 'next/server'
import { z } from 'zod'
import { authService, EmailTakenError } from '@/server/services/auth.service'
import { registerSchema } from '@/server/validators/auth.schema'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = registerSchema.parse(body)
    await authService.register(validated)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    if (error instanceof EmailTakenError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 409 }
      )
    }
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
