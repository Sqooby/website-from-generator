/**
 * Auth Service
 * Single responsibility: business logic for registration and credential verification
 * Depends on userRepository, not directly on Prisma or bcrypt details in callers
 */

import bcrypt from 'bcryptjs'
import { userRepository } from '@/server/repositories/user.repository'
import type { RegisterInput } from '@/server/validators/auth.schema'

export class EmailTakenError extends Error {
  constructor(email: string) {
    super(`Email "${email}" is already registered`)
    this.name = 'EmailTakenError'
  }
}

export const authService = {
  async register(input: RegisterInput) {
    const taken = await userRepository.existsByEmail(input.email)
    if (taken) throw new EmailTakenError(input.email)

    const passwordHash = await bcrypt.hash(input.password, 12)

    return userRepository.create({
      email: input.email,
      name: input.name,
      passwordHash,
    })
  },

  /**
   * Verify email + password credentials.
   * Returns user object (without passwordHash) or null if invalid.
   */
  async verifyCredentials(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    if (!user || !user.passwordHash) return null

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return null

    // Return without passwordHash - never expose it to JWT/session
    const { passwordHash: _, ...safeUser } = user
    return safeUser
  },
}
