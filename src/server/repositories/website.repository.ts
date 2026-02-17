/**
 * Website Repository
 * Single responsibility: all database operations for Website model
 * No business logic - only data access
 */

import { prisma } from '@/lib/db/prisma'

export type CreateWebsiteData = {
  userId: string
  subdomain: string
  templateId: string
  content: {
    brideName: string
    groomName: string
    weddingDate: Date
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    storyTitle?: string
    storyContent?: string
    ceremonyVenue?: string
    ceremonyAddress?: string
    receptionVenue?: string
    receptionAddress?: string
    sections: string // JSON string
  }
}

export type UpdateWebsiteData = {
  published?: boolean
  publishedAt?: Date | null
  templateId?: string
  deploymentUrl?: string
  deploymentId?: string
}

export const websiteRepository = {
  async findAll(userId: string) {
    return prisma.website.findMany({
      where: { userId },
      include: { content: true },
      orderBy: { createdAt: 'desc' },
    })
  },

  async findById(id: string) {
    return prisma.website.findUnique({
      where: { id },
      include: { content: true, photos: true },
    })
  },

  async findBySubdomain(subdomain: string) {
    return prisma.website.findUnique({
      where: { subdomain },
      include: { content: true, photos: true, rsvps: true },
    })
  },

  async existsBySubdomain(subdomain: string) {
    const website = await prisma.website.findUnique({
      where: { subdomain },
      select: { id: true },
    })
    return website !== null
  },

  async findByIdWithContent(id: string) {
    return prisma.website.findUnique({
      where: { id },
      include: { content: true },
    })
  },

  async create(data: CreateWebsiteData) {
    return prisma.website.create({
      data: {
        userId: data.userId,
        subdomain: data.subdomain,
        templateId: data.templateId,
        published: false,
        content: { create: data.content },
      },
      include: { content: true },
    })
  },

  async update(id: string, data: UpdateWebsiteData) {
    return prisma.website.update({
      where: { id },
      data,
      include: { content: true },
    })
  },

  async delete(id: string) {
    return prisma.website.delete({ where: { id } })
  },
}
