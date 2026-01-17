import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { templateRegistry } from '@/templates/registry'
import type { WebsiteContent } from '@/types'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
// Edge Runtime doesn't support Node.js APIs like 'fs' and 'path'
export const runtime = 'nodejs'

interface Props {
  params: Promise<{
    subdomain: string
  }>
}

async function getWebsiteBySubdomain(subdomain: string) {
  const website = await prisma.website.findUnique({
    where: { subdomain },
    include: {
      content: true,
      photos: true,
      rsvps: true,
    },
  })

  if (!website || !website.content) {
    return null
  }

  // Parse JSON fields
  const parsedContent = {
    ...website.content,
    weddingDate: website.content.weddingDate,
    ceremonyTime: website.content.ceremonyTime,
    receptionTime: website.content.receptionTime,
    sections: JSON.parse(website.content.sections),
    timeline: website.content.timeline
      ? JSON.parse(website.content.timeline)
      : undefined,
    settings: website.content.settings
      ? JSON.parse(website.content.settings)
      : undefined,
  } as WebsiteContent

  return {
    ...website,
    content: parsedContent,
  }
}

export default async function WeddingWebsitePage({ params }: Props) {
  const { subdomain } = await params
  const website = await getWebsiteBySubdomain(subdomain)

  if (!website || !website.published) {
    notFound()
  }

  // Get template from registry
  const template = templateRegistry[website.templateId]

  if (!template) {
    notFound()
  }

  const Template = template.component

  return <Template content={website.content} photos={website.photos} rsvps={website.rsvps} />
}
