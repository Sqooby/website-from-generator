import { NextResponse } from 'next/server'
import { z } from 'zod'
import { deployToCloudflare } from '@/lib/cloudflare/deploy'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
export const runtime = 'nodejs'

const deploySchema = z.object({
  websiteId: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { websiteId } = deploySchema.parse(body)
    const result = await deployToCloudflare(websiteId)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Deployment error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to deploy website' },
      { status: 500 }
    )
  }
}
