/**
 * User Repository
 * Single responsibility: all database operations for User model
 * No business logic - only data access
 */

import { prisma } from '@/lib/db/prisma'

export type CreateUserData = {
  email: string
  name?: string | null
  passwordHash?: string | null
  image?: string | null
}

export const userRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  },

  async existsByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    return user !== null
  },

  async create(data: CreateUserData) {
    return prisma.user.create({ data })
  },
}
