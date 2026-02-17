/**
 * RSVP Service
 * Single responsibility: business logic for RSVP submission
 * Depends on repositories, not directly on Prisma
 */

import { rsvpRepository } from '@/server/repositories/rsvp.repository'
import { websiteRepository } from '@/server/repositories/website.repository'
import type { RsvpInput } from '@/server/validators/rsvp.schema'

export class WebsiteNotFoundError extends Error {
  constructor(subdomain: string) {
    super(`Website with subdomain "${subdomain}" not found`)
    this.name = 'WebsiteNotFoundError'
  }
}

export const rsvpService = {
  async submitRsvp(input: RsvpInput) {
    const website = await websiteRepository.findBySubdomain(input.subdomain)
    if (!website) throw new WebsiteNotFoundError(input.subdomain)

    return rsvpRepository.create({
      websiteId: website.id,
      guestName: input.guestName,
      email: input.email,
      attending: input.attending,
      plusOne: input.plusOne || false,
      plusOneName: input.plusOneName,
      dietaryRequirements: input.dietaryRequirements,
      message: input.message,
    })
  },
}
