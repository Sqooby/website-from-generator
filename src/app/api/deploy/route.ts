import { NextResponse } from 'next/server'
import { deployToCloudflare } from '@/lib/cloudflare/deploy'
import { z } from 'zod'

const deploySchema = z.object({
  websiteId: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { websiteId } = deploySchema.parse(body)

    const result = await deployToCloudflare(websiteId)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Deployment error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to deploy website',
      },
      { status: 500 }
    )
  }
}
