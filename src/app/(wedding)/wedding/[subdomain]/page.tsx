import { notFound } from 'next/navigation'
import { websiteService } from '@/server/services/website.service'
import { templateRegistry } from '@/templates/registry'

// Using Node.js runtime because Prisma with SQLite requires filesystem access
export const runtime = 'nodejs'

interface Props {
  params: Promise<{ subdomain: string }>
}

export default async function WeddingWebsitePage({ params }: Props) {
  const { subdomain } = await params
  const website = await websiteService.getWebsiteBySubdomain(subdomain)

  if (!website || !website.published) {
    notFound()
  }

  const template = templateRegistry[website.templateId]

  if (!template) {
    notFound()
  }

  const Template = template.component

  return <Template content={website.content} photos={website.photos} rsvps={website.rsvps} />
}
