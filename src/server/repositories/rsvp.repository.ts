/**
 * RSVP Repository
 * Single responsibility: all database operations for RSVP model
 * No business logic - only data access
 */

import { prisma } from '@/lib/db/prisma'

export type CreateRsvpData = {
  websiteId: string
  guestName: string
  email: string
  attending: boolean
  plusOne: boolean
  plusOneName?: string
  dietaryRequirements?: string
  message?: string
}

export const rsvpRepository = {
  async create(data: CreateRsvpData) {
    return prisma.rSVP.create({ data })
  },
}
