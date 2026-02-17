/**
 * Website Service
 * Single responsibility: business logic for website operations
 * Depends on repositories, not directly on Prisma
 */

import { websiteRepository } from '@/server/repositories/website.repository'
import type { CreateWebsiteInput, UpdateWebsiteInput } from '@/server/validators/website.schema'
import type { WebsiteContent } from '@/types'

export class SubdomainTakenError extends Error {
  constructor(subdomain: string) {
    super(`Subdomain "${subdomain}" is already taken`)
    this.name = 'SubdomainTakenError'
  }
}

export class WebsiteNotFoundError extends Error {
  constructor(id: string) {
    super(`Website "${id}" not found`)
    this.name = 'WebsiteNotFoundError'
  }
}

const DEFAULT_SECTIONS = {
  hero: true,
  countdown: true,
  story: true,
  events: true,
  rsvp: true,
  gallery: true,
  travel: false,
  faq: false,
}

export const websiteService = {
  async listWebsites() {
    return websiteRepository.findAll()
  },

  async getWebsite(id: string) {
    const website = await websiteRepository.findById(id)
    if (!website) throw new WebsiteNotFoundError(id)
    return website
  },

  async createWebsite(input: CreateWebsiteInput) {
    const taken = await websiteRepository.existsBySubdomain(input.subdomain)
    if (taken) throw new SubdomainTakenError(input.subdomain)

    return websiteRepository.create({
      subdomain: input.subdomain,
      templateId: input.templateId,
      content: {
        brideName: input.brideName,
        groomName: input.groomName,
        weddingDate: new Date(input.weddingDate),
        primaryColor: input.primaryColor || '#8B7355',
        secondaryColor: input.secondaryColor || '#F5F5DC',
        accentColor: input.accentColor || '#D4AF37',
        fontFamily: 'Playfair Display',
        storyTitle: input.storyTitle,
        storyContent: input.storyContent,
        ceremonyVenue: input.ceremonyVenue,
        ceremonyAddress: input.ceremonyAddress,
        receptionVenue: input.receptionVenue,
        receptionAddress: input.receptionAddress,
        sections: JSON.stringify(input.sections || DEFAULT_SECTIONS),
      },
    })
  },

  async updateWebsite(id: string, input: UpdateWebsiteInput) {
    const website = await websiteRepository.update(id, {
      ...(input.published !== undefined && {
        published: input.published,
        publishedAt: input.published ? new Date() : null,
      }),
      ...(input.templateId && { templateId: input.templateId }),
    })
    return website
  },

  async deleteWebsite(id: string) {
    const exists = await websiteRepository.findById(id)
    if (!exists) throw new WebsiteNotFoundError(id)
    return websiteRepository.delete(id)
  },

  async getWebsiteBySubdomain(subdomain: string) {
    const website = await websiteRepository.findBySubdomain(subdomain)

    if (!website || !website.content) return null

    const parsedContent = {
      ...website.content,
      sections: JSON.parse(website.content.sections),
      timeline: website.content.timeline
        ? JSON.parse(website.content.timeline)
        : undefined,
      settings: website.content.settings
        ? JSON.parse(website.content.settings)
        : undefined,
    } as WebsiteContent

    return { ...website, content: parsedContent }
  },
}
